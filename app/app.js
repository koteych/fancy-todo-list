
/** Hardcoded for better presentation */
const DEFAULT_DATE = '2022-10-07';

/** 
 *  Global object, we contain here all todos that are currently displayed.
 *  This is required for proper sorting and filtering
*/
let todos = [];
let onlyUndoneFlag = false;

const todoListContainer = document.querySelector('.todo-list');
const searchButton = document.querySelector('.search-button');
const searchField = document.querySelector('.search-field');
const selectedDate = document.querySelector('.selected-date');
const todayButton = document.querySelector('.today-button');
const thisWeekButton = document.querySelector('.this-week-button'); 
const onlyUndoneCheckbox = document.querySelector('.only-undone-todos');

todoListContainer.addEventListener('click', (e) => {
  if (String(e.target.tagName).toLowerCase() === 'button') {
    for (let todo of todos) {
      if (todo.id === e.target.id) {
        showTodoInfoInModal(todo);
        break;
      }
    }
  }
})


/** Display only undone todos */
onlyUndoneCheckbox.addEventListener('click', (e) => {
  onlyUndoneFlag = !!onlyUndoneCheckbox.checked;
  const onlyDoneTodos = todos.filter((todo) => {
    if (onlyUndoneFlag) {
      return todo.status === false;
    }
    return true;
  });
  updateTodoList(todoListContainer, onlyDoneTodos);
})

/**
 * This week button
 */
thisWeekButton.addEventListener('click', (e) => {
    console.log('getting todos for this week')
})

/**
 * Today button
 */
todayButton.addEventListener('click', (e) => {
  getTodosForToday((data) => {
    updateTodosWithData(data);
    const onlyDoneTodos = todos.filter((todo) => (true));
    updateTodoList(todoListContainer, onlyDoneTodos);
  })
})


/**
 * Search field handling
 */
searchButton.addEventListener('click', (e) => {
  const searchString = searchField.value;
  getTodoByName(searchString, (data) => {
    updateTodosWithData(data);
    const onlyDoneTodos = todos.filter((todo) => (true));
    updateTodoList(todoListContainer, onlyDoneTodos);
  })
})

function Todo(id = null, name = '', shortDescription = '', fullDescription = '', date = '', status = false) {
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

window.addEventListener('DOMContentLoaded', (e) => {
  selectedDate.innerHTML = DEFAULT_DATE;
  getTodoByDate(DEFAULT_DATE, (data) => {
    todos = [];
    for (const retrievedTodo of data) {
      todos.push(new Todo(retrievedTodo.id, retrievedTodo.name, retrievedTodo.shortDesc, retrievedTodo.fullDesc, retrievedTodo.date));
    }

    updateTodoList(todoListContainer, todos)
  })
})

function formatDate(date) {
  const p = (new Date(date)).getTime();
  return p;
}

function showTodoInfoInModal(todo) {
  $("#todo-short-description").text(todo.shortDescription);
  $("#todo-full-description").text(todo.fullDescription);
  $("#dialog-message").dialog('open');
}

function updateTodosWithData(data) {
  todos = [];

  for (const retrievedTodo of data) {
    todos.push(new Todo(retrievedTodo.id, retrievedTodo.name, retrievedTodo.shortDesc, retrievedTodo.fullDesc, retrievedTodo.date, retrievedTodo.status));
  }
}