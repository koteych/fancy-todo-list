$(function () {

  $("#datepicker").datepicker({
    onSelect: function (dateText, inst) {
      console.log("Selected date: " + dateText);
      $('.selected-date').html(dateText);

      console.log(new Date(dateText));
      console.log(formatDate(dateText));

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
    defaultDate: new Date(DEFAULT_DATE)
  });
});