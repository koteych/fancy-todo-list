
/** 
 *  Global object, we contain here all todos that are currently displayed.
 *  This is required for proper sorting and filtering
*/
let todos = [];
let onlyUndoneFlag = false;
let sortByDateFlag = false;

const todoListContainer = document.querySelector('.todo-list');
const searchButton = document.querySelector('.search-button');
const searchField = document.querySelector('.search-field');
const selectedDate = document.querySelector('.selected-date');
const todayButton = document.querySelector('.today-button');
const thisWeekButton = document.querySelector('.this-week-button'); 
const onlyUndoneCheckbox = document.querySelector('.only-undone-todos');
const sortByDateCheckbox = document.querySelector('.sort-by-date-checkbox');

/** Hardcoded for better presentation because there are no up-to-date todos on 2023 */
const DEFAULT_DATE = '2022-10-07';

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

sortByDateCheckbox.addEventListener('click', (e) => {
  sortByDateFlag = !!sortByDateCheckbox.checked;
  updateTodoList(todoListContainer, todos);
})

onlyUndoneCheckbox.addEventListener('click', (e) => {
  onlyUndoneFlag = !!onlyUndoneCheckbox.checked;
  updateTodoList(todoListContainer, todos);
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

function applyShowUndoneFiltering(todosList) {
  const onlyUndoneTodos = todosList.filter((todo) => {
    if (onlyUndoneFlag) {
      return todo.status === false;
    }
    return true;
  });

  return onlyUndoneTodos;
}

function applySortByDateFiltering(todosList) {
  const sortedByDateTodos = todosList.slice().sort((a, b) => {
    if (sortByDateFlag) {
      // TODO: constructing Date objects in filtering logic is expensive
      // we should do that in Todo constructor
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });
  return sortedByDateTodos;
}

function updateTodoList(todoListContainer, listTodos) {
  let filteredTodos = [];

  while (todoListContainer.firstChild) {
    todoListContainer.removeChild(todoListContainer.firstChild);
  }

  /* We can filter by different criteria by piping filtering functions */
  filteredTodos = applyShowUndoneFiltering(applySortByDateFiltering(listTodos));

  console.log('filtered todos')
  console.log(filteredTodos);

  if (filteredTodos.length === 0) {
    noTodoStub(todoListContainer);
    return;
  }

  for (todo of filteredTodos) {
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