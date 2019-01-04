
fetch("http://localhost:8080/api/test")
.then(response => response.json())
.then(results => {
    console.log(results.data)
    $(".js-trips-container").html(results.data)
})
.catch(err => {
  $('.js-error-message').html("Whoops! We currently don't have anything available for your search. Please try another search.");
});






















//fetches trip data
function fetchTrips() {
  fetch("/api/test")
  .then(response => response.json())
  .then(results => {
    console.log(results.data)
    $(".js-trips-container").html(results.data)
  })
  .catch(err => {
    $('.js-error-message').html("Whoops! Something went wrong.");
  });
}

function openModal() {

}

function closeModal() {

}

function addEntry() {

}

function editEntry() {

}

function deleteEntry() {

}

function displaySelectedModal() {  

}

