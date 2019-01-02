

fetch("/api/test")
.then(response => response.json())
.then(results => {
    console.log(results.data)
    $(".js-trips-container").html(results.data)
})
.catch(err => {
  $('.js-error-message').html("Whoops! We currently don't have anything available for your search. Please try another search.");
});