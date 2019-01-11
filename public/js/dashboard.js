let deadline = new Date(Date.parse(new Date('01/12/2019')))  //test date


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
    $('.container').addClass('opaque');
    $('.js-modal-container').show();
  });
}


//confirms user wants to close modal when user clicks cancel and closes it
function closeModal() {
  $('.js-entry-modal').on('click', '.js-cancel-button', function() {
    confirm("Are you sure you want to close without submitting your trip?");
    $('.js-modal-container').hide();
    $('.container').removeClass('opaque');
    clearTripModal();
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

//listens for submit of new trip
const submitNewTrip = () => {

}
//posts trip
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
  })
  .catch(error => console.log('Bad request'));
}

//clears fields in trip modal
function clearTripModal() {
  $('.entry-input').val('');
  $('.date').val('');
  $('#description-field').val('');
}

//listens for when user selects edit
const submitEdit = () => {

}

//edits trip
function editEntry() {

}

//listens for when user selects delete
const submitDelete = () => {

}

//deletes trip entry
function deleteEntry() {

}


//////// manipulation of data ////

//Creates trip modal
function createTripModal(responseJson) {
  $(".js-trips-container").empty();

  if(responseJson.length > 0) {
    for(let i = 0; i < responseJson.length; i++) {
      $(".js-trips-container").append(`
      <div id='trip-modal'>
  
      <button id="edit-button">edit</button>

        <h2 id="destination-title">${responseJson[i].destination}</h2>
        
        <div id="clockdiv">
          <div>
            <span class="days"></span>
            <div class="smalltext">Days</div>
          </div>

          <div>
            <span class="hours"></span>
            <div class="smalltext">Hours</div>
          </div>

          <div>
            <span class="minutes"></span>
            <div class="smalltext">Minutes</div>
          </div>

          <div>
            <span class="seconds"></span>
            <div class="smalltext">Seconds</div>
          </div>
        </div>

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
          <p id="details-label">Trip details:</p>
          <p id="details-box">${responseJson[i].tripDetails}</p>
        </div>

        <button class="delete-button">delete</button>

      </div>
      `);
    }
  }
}

///// countdown clock /////

//gets remaining time to date
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

//initializes clock
function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector('.days');
  let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

initializeClock('clockdiv', deadline);


////


