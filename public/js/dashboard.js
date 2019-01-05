
//fetches trip data
(function fetchTrips (){
  fetch("http://localhost:8080/api/test")
  .then(response => response.json())
  .then(results => {
      console.log(results.data)
      $(".js-trips-container").html(results.data)
  })
  .catch(err => {
    $('.js-error-message').html("Whoops! We currently don't have anything available for your search. Please try another search.");
  });
})();

//opens modal to add trip
function openModal() {

}

//closes modal
function closeModal() {

}

//adds trip
function addEntry() {

}

//edits trip
function editEntry() {

}

//deletes trip entry
function deleteEntry() {

}

//show trip modal on click
function displaySelectedModal() {  

}

