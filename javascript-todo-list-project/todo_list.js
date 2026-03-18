const todoList = JSON.parse(localStorage.getItem('todos')) || [];

renderTodoList();

document.querySelector('.js-add-todo-button')
  .addEventListener('click', addTodo);

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    todoListHTML += `
      <div class="todo-item">
        <div class="todo-name">${name}</div>
        <div class="todo-date">${dueDate || ''}</div>
        <button class="delete-todo-button"
          onclick="deleteTodo(${index})">
          Delete
        </button>
      </div>
    `;
  });

  document.querySelector('.js-todo-list').innerHTML =
    todoListHTML || `<div class="empty-state">No tasks yet — add your first task 🚀</div>`;
}

function addTodo() {
  const nameInput = document.querySelector('.js-name-input');
  const dateInput = document.querySelector('.js-due-date-input');

  const name = nameInput.value.trim();
  const dueDate = dateInput.value;

  if (!name) return;

  todoList.push({ name, dueDate });

  localStorage.setItem('todos', JSON.stringify(todoList));

  nameInput.value = '';
  dateInput.value = '';

  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todoList));
  renderTodoList();
}