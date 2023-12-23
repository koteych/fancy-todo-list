
/** 
 * requests examples https://todo.doczilla.pro/api/todos/date?from=1637618400000&to=1637618400000
 */

const todoListContainer = document.querySelector('.todo-list');

function Todo(id=null, name='', shortDescription='', fullDescription='', date='', status=false) {
  this.id = id;
  this.name = name;
  this.shortDescription = shortDescription;
  this.fullDescription = fullDescription;
  this.date = date;
  this.status = status;
}

function updateTodoList(todoListContainer, listTodos) {

  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  for (todo of listTodos) {
    appendTodo(todoListContainer, todo);
  }
}

function appendTodo(containerElement, todo) {
  const todoElement = document.createElement('div');
  todoElement.className = 'todo';
  todoElement.id = 'id';

  const todoTitle = document.createElement('h2');
  todoTitle.textContent = todo.name;
  todoTitle.className = 'todo__name';
  todoElement.appendChild(todoTitle);

  const todoDate = document.createElement('span');
  todoDate.className = 'todo__date';
  todoDate.textContent = todo.date;
  todoTitle.appendChild(todoDate);

  const todoShortDescription = document.createElement('div');
  todoShortDescription.textContent = todo.shortDescription;
  todoShortDescription.className = 'todo__short-description';

  todoElement.appendChild(todoShortDescription);

  const todoStatus = document.createElement('div');
  todoStatus.textContent = 'status';
  todoStatus.className = 'todo__status';
  todoElement.appendChild(todoStatus);

  const moreButton = document.createElement('button');
  moreButton.className = 'todo__more-button';
  moreButton.textContent = 'Подробнее';

  todoElement.appendChild(moreButton);

  containerElement.appendChild(todoElement);
}

window.addEventListener('DOMContentLoaded', (e) => {


  const todos = [
    new Todo(null, "some new todo", "Краткое описание тудушки"),
    new Todo(null, "some new todo", "Краткое описание тудушки"),
    new Todo(null, "some new todo", "Краткое описание тудушки"),
    new Todo(null, "some new todo", "Краткое описание тудушки"),
    new Todo(null, "some new todo", "Краткое описание тудушки"),
  ];

  updateTodoList(todoListContainer, todos)
})



function renderTodo() {

}

function formatDate(date) {
  const p = (new Date(date)).getTime();
  return p;
}

console.log(formatDate('2021-11-22'));


fetch('http://localhost:4400/api/todos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
