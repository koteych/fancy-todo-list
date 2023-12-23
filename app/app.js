
/** 
 * requests examples https://todo.doczilla.pro/api/todos/date?from=1637618400000&to=1637618400000
 * https://todo.doczilla.pro/api/todos/find?q=molestie
 */

const DEFAULT_DATE = '2022-10-07';

const todoListContainer = document.querySelector('.todo-list');
const searchButton = document.querySelector('.search-button');
const searchField = document.querySelector('.search-field');
const selectedDate = document.querySelector('.selected-date');

searchButton.addEventListener('click', (e) => {
  const searchString = searchField.value;
  getTodoByName(searchString, (data) => {
    console.log('getting todos');
    console.log(data);


    const todos = [];
    for (const retrievedTodo of data) {
      todos.push(new Todo(null, retrievedTodo.name, retrievedTodo.shortDesc, '', retrievedTodo.date));
    }

    console.log('formed todos');
    console.log(todos);
    console.log('end formed todos');

    updateTodoList(todoListContainer, todos)
  })
})

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
  todoStatus.textContent = todo.status;
  todoStatus.className = 'todo__status';
  todoElement.appendChild(todoStatus);

  const moreButton = document.createElement('button');
  moreButton.className = 'todo__more-button';
  moreButton.textContent = 'Подробнее';

  todoElement.appendChild(moreButton);

  containerElement.appendChild(todoElement);
}

window.addEventListener('DOMContentLoaded', (e) => {
  selectedDate.innerHTML = DEFAULT_DATE;
  getTodoByDate(DEFAULT_DATE, (data) => {
    console.log('getting todos');
    console.log(data);


    const todos = [];
    for (const retrievedTodo of data) {
      todos.push(new Todo(null, retrievedTodo.name, retrievedTodo.shortDesc, '', retrievedTodo.date));
    }

    updateTodoList(todoListContainer, todos)
  })
})



function renderTodo() {

}

function formatDate(date) {
  const p = (new Date(date)).getTime();
  return p;
}