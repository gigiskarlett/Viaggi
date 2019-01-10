//binds event handlers

$(() => {
  fetchTrips();  
  openEntryModal();
  closeModal();
});

//// Modal functionality /////

//opens modal when button is clicked
function openEntryModal() {
  $('#button-container').on('click', '.js-create-button', function() {
  $('.js-modal-container').show();
  });
}


//closes modal when user clicks cancel
function closeModal() {
  $('.js-entry-modal').on('click', '.js-cancel-button', function() {
    confirm("Are you sure you want to close without submitting your trip?");
    $('.js-modal-container').hide();
  })
}

//// CRUD operations for trips data /////

//fetches trip data
function fetchTrips(callback) {
  fetch("http://localhost:8080/trips")
  .then(response => response.json())
  .then(responseJson => {
      console.log(responseJson)
      return responseJson
  })
  .then(responseJson => createTripModal(responseJson))
  .catch(err => {
    $('.js-error-message').html("Whoops! We currently don't have anything available for your search. Please try another search.");
  });
}
const postTrip = (newTripEntry) => {
  fetch('/trips',
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    method: "POST",
    body: JSON.stringify(newTripEntry)
  })
  .then(response => {
    fetchTrips();
    return response.json()
  })
  .catch(error => console.log('Bad request'));
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

//////// manipulation of data ////

function createTripModal(responseJson) {
  $(".js-trips-container").empty();

  if(responseJson.length > 0) {
    for(let i = 0; i < responseJson.length; i++) {
      $(".js-trips-container").append(`
      <div id="trip-modal">
        <h2 id="destination-title">${responseJson[i].destination}</h2>

        <section id="date-container">

          <section id="left">
            <p id="date-label">When?</p>
            <p id="trip date">${responseJson[i].when}</p>
          </section>

          <section id= "right">
            <p id="date-label">Returning</p>
            <p id="return date">${responseJson[i].lastDayOfTrip}</p>
          </section>

        </section>

        <div>
          <p id="details-box">${responseJson[i].tripDetails}</p>
        </div>

      </div>
      `);
    }
  }
}




