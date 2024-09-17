// Select elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTodos);

// Add a new task
addBtn.addEventListener("click", function() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        addTodoItem(taskText);
        saveTodoToLocalStorage(taskText);
        todoInput.value = ''; // Clear the input field
    }
});

// Add a new todo item to the list
function addTodoItem(taskText, isCompleted = false) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (isCompleted) todoItem.classList.add("completed");
    todoItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;
    todoList.appendChild(todoItem);
    addEventListeners(todoItem);
}

// Add event listeners for completed and delete buttons
function addEventListeners(todoItem) {
    const completeBtn = todoItem.querySelector(".complete-btn");
    const deleteBtn = todoItem.querySelector(".delete-btn");

    completeBtn.addEventListener("click", function() {
        todoItem.classList.toggle("completed");
        updateTodoStatus(todoItem);
    });

    deleteBtn.addEventListener("click", function() {
        todoItem.remove();
        removeTodoFromLocalStorage(todoItem);
    });
}

// Save task to local storage
function saveTodoToLocalStorage(taskText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ taskText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Update task status in local storage
function updateTodoStatus(todoItem) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const taskText = todoItem.querySelector("span").textContent;
    todos = todos.map(todo => {
        if (todo.taskText === taskText) {
            todo.isCompleted = !todo.isCompleted;
        }
        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove task from local storage
function removeTodoFromLocalStorage(todoItem) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const taskText = todoItem.querySelector("span").textContent;
    todos = todos.filter(todo => todo.taskText !== taskText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load tasks from local storage when the page loads
function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        addTodoItem(todo.taskText, todo.isCompleted);
    });
}
