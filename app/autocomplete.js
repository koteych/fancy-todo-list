$( function() {
    let foundTodos = [];

    $("#todos-autocomplete").autocomplete({
      select: function(event, ui) {
        var selectedValue = ui.item.value;
        console.log("Selected: " + selectedValue);
        console.log(foundTodos);

        for (let todo of foundTodos) {
            if (todo.name === selectedValue) {
                const todoToShow = new Todo(todo.id, todo.name, todo.shortDesc, todo.fullDesc, todo.date, todo.status);
                showTodoInfoInModal(todoToShow);
                return;
            }
        }

      },
      source: function(request, response) {
        console.log(request);
        console.log(API_URL)
        $.ajax({
          url: `${API_URL}/find?q=${request.term}&limit=20`,
          dataType: "json",
          data: {
            term: request.term
          },
          success: function(data) {
            foundTodos = data;
            response(data.map((i) => i.name));
          }
        });
      }
    });
  } );