const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];
let id = 100;

loadFromLocalStorage();
render();
updateCounter();

function renderTodo(todo) {
  return `
    <li class="list-group-item">
        <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? "checked" : ""} />
        <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
        <button class="btn btn-danger btn-sm float-end" data-id="${todo.id}">delete</button>
    </li>
  `;
}

function newTodo() {
  const text = prompt("Enter todo:");
  if (text && text.trim() !== "") {
    const todo = {
      id: id++,
      text: text.trim(),
      checked: false
    };
    todos.push(todo);
    render();
    updateCounter();
    saveToLocalStorage();
    console.log("Поточні TODO:", todos);
  } else {
    alert("Завдання не може бути порожнім.");
  }
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(idToDelete) {
  todos = todos.filter(todo => todo.id !== idToDelete);
  render();
  updateCounter();
  saveToLocalStorage();
}

function checkTodo(id, isChecked) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.checked = isChecked;
    render();
    updateCounter();
    saveToLocalStorage();
  }
}

document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "delete") {
    const idToDelete = parseInt(e.target.dataset.id);
    deleteTodo(idToDelete);
  }

  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    const changedId = parseInt(e.target.id);
    checkTodo(changedId, e.target.checked);
  }
});


function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('todoIdCounter', id);
}

function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  const storedId = localStorage.getItem('todoIdCounter');
  
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  if (storedId) {
    id = parseInt(storedId, 10);
  }
}
