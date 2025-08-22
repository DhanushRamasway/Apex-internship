// To-Do App with LocalStorage
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load tasks from storage
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
};

// Add new task
function addTask() {
  if (todoInput.value.trim() === "") return;
  let task = todoInput.value.trim();
  addTaskToDOM(task);
  saveTask(task);
  todoInput.value = "";
}

// Add to DOM
function addTaskToDOM(task) {
  let li = document.createElement("li");
  li.textContent = task;
  li.onclick = () => {
    li.style.transform = "scale(0.9)";
    setTimeout(() => {
      li.remove();
      removeTask(task);
    }, 200);
  };
  todoList.appendChild(li);
}

// Save task
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
