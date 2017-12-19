// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    
    var newId={id:id};
    id=id.toString();

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newId
    }).then(
      function() {
        console.log("changed to devoured");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#submit").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#newBurger").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
