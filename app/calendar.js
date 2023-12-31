$(function () {

  $("#datepicker").datepicker({
    onSelect: function (dateText, inst) {
      $('.selected-date').html(dateText);

      DEFAULT_DATE = dateText;

      getTodoByDate(dateText, (data) => {

        todos = [];
        for (const retrievedTodo of data) {
          todos.push(new Todo(retrievedTodo.id, retrievedTodo.name,
            retrievedTodo.shortDesc, retrievedTodo.fullDesc,
            retrievedTodo.date, retrievedTodo.status));
        }

        updateTodoList(todoListContainer, todos)
      })
    },
    dateFormat: "yy-mm-dd",
    defaultDate: new Date(DEFAULT_DATE),
    firstDay: 1
  });
});