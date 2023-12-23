
/** 
 * requests examples https://todo.doczilla.pro/api/todos/date?from=1637618400000&to=1637618400000
 */

function Todo(id=null, name='', shortDescription='', fullDescription='', date='', status=false) {
  this.id = id;
  this.name = name;
  this.shortDescription = shortDescription;
  this.fullDescription = fullDescription;
  this.date = date;
  this.status = status;
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
  todoDate.textContent = '2021-11-22T22:00:00.000+0000';
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
  const todoListContainer = document.querySelector('.todo-list');

  appendTodo(todoListContainer, new Todo(null, "some new todo", "Краткое описание тудушки"));
  appendTodo(todoListContainer, new Todo(null, "Еще одна туду", "Еще описание"));
})



function renderTodo() {

}

function formatDate(date) {
  const p = (new Date(date)).getTime();
  return p;
}


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
