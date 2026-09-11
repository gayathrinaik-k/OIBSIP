const taskInput = document.getElementById("taskInput");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");


// Get tasks from localStorage
let tasks = JSON.parse(
    localStorage.getItem("todoTasks")
) || [];


// Save tasks
function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


// Add new task
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: new Date().toISOString(),

        completedAt: null
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


// Mark task complete/pending
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

            if (task.completed) {

                task.completedAt =
                    new Date().toISOString();

            } else {

                task.completedAt = null;
            }
        }

        return task;
    });

    saveTasks();

    displayTasks();
}


// Delete task
function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    displayTasks();
}


// Edit task
function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    const newText = prompt(
        "Edit your task:",
        task.text
    );

    if (newText !== null &&
        newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();

        displayTasks();
    }
}


// Format date
function formatDate(date) {

    return new Date(date).toLocaleString();
}


// Create task element
function createTask(task) {

    const li = document.createElement("li");

    li.className =
        "task " +
        (task.completed ? "completed" : "");

    const text = document.createElement("span");

    text.className = "task-text";

    text.textContent = task.text;

    li.appendChild(text);


    // Timestamp
    const timestamp =
        document.createElement("small");

    timestamp.className = "timestamp";

    if (task.completed) {

        timestamp.textContent =
            "Added: " +
            formatDate(task.createdAt) +
            " | Completed: " +
            formatDate(task.completedAt);

    } else {

        timestamp.textContent =
            "Added: " +
            formatDate(task.createdAt);
    }

    li.appendChild(timestamp);


    // Buttons
    const actions =
        document.createElement("div");

    actions.className = "actions";


    // Complete button
    const completeButton =
        document.createElement("button");

    completeButton.className =
        "complete-btn";

    completeButton.textContent =
        task.completed
            ? "Mark Pending"
            : "Mark Complete";

    completeButton.onclick =
        () => toggleTask(task.id);


    // Edit button
    const editButton =
        document.createElement("button");

    editButton.className =
        "edit-btn";

    editButton.textContent = "Edit";

    editButton.onclick =
        () => editTask(task.id);


    // Delete button
    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-btn";

    deleteButton.textContent = "Delete";

    deleteButton.onclick =
        () => deleteTask(task.id);


    actions.appendChild(completeButton);

    actions.appendChild(editButton);

    actions.appendChild(deleteButton);

    li.appendChild(actions);

    return li;
}


// Display all tasks
function displayTasks() {

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    const pendingTasks =
        tasks.filter(
            task => !task.completed
        );

    const completedTasks =
        tasks.filter(
            task => task.completed
        );


    // Pending tasks
    pendingTasks.forEach(task => {

        pendingList.appendChild(
            createTask(task)
        );
    });


    // Completed tasks
    completedTasks.forEach(task => {

        completedList.appendChild(
            createTask(task)
        );
    });


    // Counts
    pendingCount.textContent =
        pendingTasks.length + " pending";

    completedCount.textContent =
        completedTasks.length + " completed";


    // Empty messages
    pendingEmpty.style.display =
        pendingTasks.length === 0
            ? "block"
            : "none";

    completedEmpty.style.display =
        completedTasks.length === 0
            ? "block"
            : "none";
}


// Press Enter to add task
taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();
        }
    }
);


// Initial display
displayTasks();
