
$( function() {

    $("#todo-short-description").text("New text in the dialog");
    $( "#dialog-message" ).dialog({
      width: 700,
      height: 500,
      autoOpen: false,
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  } );