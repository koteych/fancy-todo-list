
function formatDateForView(dateToFormat) {
  let date = new Date(dateToFormat);
  let options = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let formattedDate = date.toLocaleDateString('ru-RU', options);

  return formattedDate;
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

    todoDate.textContent = formatDateForView(todo.date);
    todoTitle.appendChild(todoDate);
  
    const todoShortDescription = document.createElement('div');
    todoShortDescription.textContent = todo.shortDescription;
    todoShortDescription.className = 'todo__short-description';
  
    todoElement.appendChild(todoShortDescription);
  
    const todoStatus = document.createElement('div');
    todoStatus.textContent = todo.status? 'Выполнено': 'Не выполнено';
    todoStatus.className = 'todo__status';
    if (todo.status)
      todoStatus.classList.add('todo__status-done');
    todoElement.appendChild(todoStatus);

    const todoFooter = document.createElement('div');
    todoFooter.className = 'todo__footer';
    
    todoElement.appendChild(todoFooter);
  
    const moreButton = document.createElement('button');
    moreButton.className = 'todo__more-button';
    moreButton.textContent = 'Подробнее';
    moreButton.id = todo.id;
  
    todoFooter.appendChild(moreButton);
  
    containerElement.appendChild(todoElement);
  }