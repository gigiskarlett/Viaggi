
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

//opens modal to add entry
(function addEntry() {
  $('#button-container').on('click', '.js-create-button', function() {
  $('.js-modal-container').show();
  });
})();


//closes modal when user clicks cancel
(function closeModal() {
  $('.js-entry-modal').on('click', '.js-cancel-button', function() {
    confirm("Are you sure you want to close without submitting your trip?");
    $('.js-modal-container').hide();
  })
})();



//edits trip
function editEntry() {

}

//deletes trip entry
function deleteEntry() {

}

//show trip modal on click
function displaySelectedModal() {  

}

