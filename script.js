document.addEventListener("DOMContentLoaded", function () {
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskDateInput = document.getElementById("task-date");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const tasks = [];

    // Function to add a task
    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskDate = taskDateInput.value;

        if (!taskTitle || !taskDate) {
            alert("Please enter a task title and due date.");
            return;
        }

        const task = {
            title: taskTitle,
            description: taskDesc,
            dueDate: new Date(taskDate),
            isCompleted: false,
            isNotCompleted: false
        };

        tasks.push(task);
        renderTask(task);

        // Clear input fields
        taskTitleInput.value = "";
        taskDescInput.value = "";
        taskDateInput.value = "";

        checkForDueTasks();
    }

    // Function to render a task
    function renderTask(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="title">${task.title}</span>
            <span class="description">${task.description}</span>
            <span class="date">Due: ${task.dueDate.toLocaleString()}</span>
            <button class="complete-btn">Mark as Completed</button>
            <button class="delete-btn">Delete</button>
        `;

        // Mark task as completed
        li.querySelector(".complete-btn").addEventListener("click", function () {
            task.isCompleted = true;
            // li.classList.add("completed");
            li.querySelector(".complete-btn").remove();
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", function () {
            taskList.removeChild(li);
            const taskIndex = tasks.indexOf(task);
            tasks.splice(taskIndex, 1);
        });

        taskList.appendChild(li);
    }

    // Function to check for due tasks and show reminder
    function checkForDueTasks() {
        setInterval(function () {
            const now = new Date();
            tasks.forEach(task => {
                if (!task.isCompleted && !task.isNotCompleted && task.dueDate <= now) {
                    const confirmCompleted = confirm(`Task "${task.title}" is due. Do you want to cancel it?`);
                    
                    if (confirmCompleted) {
                        // Task is canceled (OK clicked)
                        const taskListItems = Array.from(taskList.children);
                        taskListItems.forEach(item => {
                            if (item.querySelector(".title").textContent === task.title) {
                                taskList.removeChild(item);
                            }
                        });
                        tasks.splice(tasks.indexOf(task), 1);
                    } else {
                        // Task is marked as not completed (No clicked)
                        task.isNotCompleted = true;
                        const taskListItems = Array.from(taskList.children);
                        taskListItems.forEach(item => {
                            if (item.querySelector(".title").textContent === task.title) {
                                item.classList.add("not-completed");
                                item.querySelector(".title").textContent += " (Not Completed)";
                            }
                        });
                    }
                }
            });
        }, 1000); // Check every second
    }

    // Add task when clicking the "Add Task" button
    addTaskBtn.addEventListener("click", addTask);
});
