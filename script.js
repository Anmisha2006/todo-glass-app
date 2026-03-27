// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const time = prompt("Enter reminder time (HH:MM)") || "";
    const dueDate = prompt("Enter due date (YYYY-MM-DD)") || "";

    tasks.push({
        text: input.value,
        done: false,
        time: time,
        due: dueDate
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" ${task.done ? "checked" : ""} 
                    onclick="toggleTask(${index})">

                <span class="${task.done ? 'completed' : ''}">
                    ${task.text} <br>
                    ⏰ ${task.time || "No time"} | 📅 ${task.due || "No date"}
                </span>
            </div>

            <div>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress();
    updateDashboard();
}

// Toggle Complete
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;

    saveTasks();
    renderTasks();

    if (tasks[index].done) {
        triggerConfetti();
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

// Progress Bar
function updateProgress() {
    const completed = tasks.filter(t => t.done).length;
    const total = tasks.length;

    document.getElementById("progressText").innerText = `${completed} / ${total} Completed`;

    let percent = total === 0 ? 0 : (completed / total) * 100;
    document.getElementById("progressFill").style.width = percent + "%";
}

// Dashboard
function updateDashboard() {
    const completed = tasks.filter(t => t.done).length;
    const total = tasks.length;
    const pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;
}

// 🌙 Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark");

    let theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

// Load saved theme
(function () {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
})();

// 🔔 Reminder Checker
setInterval(() => {
    let now = new Date();
    let currentTime = now.getHours().toString().padStart(2, '0') + ":" +
                      now.getMinutes().toString().padStart(2, '0');

    tasks.forEach(task => {
        if (task.time === currentTime && !task.done) {
            alert("⏰ Reminder: " + task.text);
        }
    });
}, 60000);

// 🎉 Confetti Effect
function triggerConfetti() {
    const colors = ["red", "blue", "yellow", "green", "purple"];

    for (let i = 0; i < 25; i++) {
        let confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = "0px";
        confetti.style.left = Math.random() * window.innerWidth + "px";

        document.body.appendChild(confetti);

        let fall = setInterval(() => {
            confetti.style.top = (parseInt(confetti.style.top) + 5) + "px";
        }, 20);

        setTimeout(() => {
            clearInterval(fall);
            confetti.remove();
        }, 2000);
    }
}
function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("dueDate").value;
    const time = document.getElementById("dueTime").value;

    if (input.value.trim() === "") {
        alert("Enter a task!");
        return;
    }

    tasks.push({
        text: input.value,
        done: false,
        time: time,
        due: date
    });

    input.value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("dueTime").value = "";

    saveTasks();
    renderTasks();
}

// Initial render
renderTasks();