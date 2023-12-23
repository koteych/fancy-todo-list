
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
    moreButton.id = todo.id;
  
    todoElement.appendChild(moreButton);
  
    containerElement.appendChild(todoElement);
  }