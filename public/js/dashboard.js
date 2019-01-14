
//binds event handlers
$(() => {
  fetchTrips();  
  openEntryModal();
  closeModal();
  submitNewTrip();
  geiIdToEditEntry();
  getIdToDelEntry();
  listensForEditSubmit();
});

//// Modal functionality /////

//opens modal when button is clicked
function openEntryModal() {
  $('#button-container').on('click', '.js-create-button', function() {
    $('.js-edit-submit-button').hide();
    $('.js-submit-button').show()
    $('.container').addClass('opaque');
    $('.js-modal-container').show();

  });
}

//confirms user wants to close modal when user clicks cancel and closes it
function closeModal() {
  $('.js-entry-modal').on('click', '.js-cancel-button', function() {
    if ( !confirm("Are you sure you want to close without submitting your trip?")) return alert("That was a close call!")
    $('.js-modal-container').hide();
    $('.container').removeClass('opaque');
    clearTripModal();
  })
}

//clears fields in trip modal
function clearTripModal() {
  $('.entry-input').val('');
  $('.date').val('');
  $('#description-field').val('');
}

//unbind event 
function unbindClick() {
  $('.js-trip-container').unbind('click', '.js-edit-submit-button', '.js-edit-button');
}

//hides modal
function hideModal() {
  $('.container').removeClass('opaque');
  $('.js-modal-container').hide();
  clearTripModal()
}

//// CRUD operations for trips data /////

//// GET all trips ////

//fetches all trips
function fetchTrips(callback) {
  fetch("http://localhost:8080/api/trips")
  .then(response => response.json())
  .then(responseJson => {
      console.log(responseJson)
      return responseJson
  })
  .then(responseJson =>  {
    renderAllTrips(responseJson)
   
  }) 
  .catch(err => {
    $('.js-error-message').html("Whoops! We currently don't have anything available for your search. Please try another search.");
  });
}

// renders trip section //
function renderTrip(trip){
 return ` <div class='js-trip-section trip-section' id='${trip.id}'>

 <button class="js-edit-button edit-button" data-tripId= '${trip.id}'>edit</button>

   <h2 id="destination-title">${trip.destination}</h2>
   
   <div class="clockdiv">
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
       <p id="trip date">${trip.when}</p>
     </section>

     <section id= "right">
       <p id="date-label">Returning</p>
       <p id="return date">${trip.lastDayOfTrip}</p>
     </section>

   </section>

   <div>
     <p id="details-label">Trip details:</p>
     <p id="details-box">${trip.tripDetails}</p>
   </div>

   <button class="js-delete-button delete-button" data-tripId='{trip.id}'>delete</button>

 </div>
 `
}

// Creates trip section and adds the clock //
function renderAllTrips(responseJson) {
  $(".js-trips-container").empty();
  if(responseJson.length > 0) {
    for(let i = 0; i < responseJson.length; i++) {
      let trip = responseJson[i];
      $(".js-trips-container").append(renderTrip(trip));
       initializeClock(trip);
    }
  }
}


////     New trip POST    ////

//listens for submit of new trip
function submitNewTrip() {
  $('.js-entry-modal').on('click', '.js-submit-button', function(event){
    event.preventDefault();
    let newTrip = {};
    newTrip.destination = $('.entry-input').val();
    newTrip.when = $('.when').val();
    newTrip.lastDayOfTrip = $('.lastDayTrip').val();
    newTrip.tripDetails = $('#description-field').val();
    postTrip(newTrip);
    hideModal();
  }); 
}

//posts trip
function postTrip(newTrip) {
  fetch('/api/trips',
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    method: "POST",
    body: JSON.stringify(newTrip)
  })
  .then(response => {
    fetchTrips();
    return response.json()
  })
  .catch(error => console.log('Bad request'));
}

////Edit trip -- PUT/:id ////

//gets id of modal selected for editing
function geiIdToEditEntry() {
  $('.js-trips-container').on('click', '.js-edit-button', function(event) { 
    event.preventDefault();
    const tripID = $(event.currentTarget)[0].attributes[1].nodeValue;
    console.log(tripID)
    getOneTrip(tripID);     
    openModal();
  });
}

// gets trip by id
function getOneTrip(tripID) {
  console.log(tripID)
  fetch(`api/trips/${tripID}`, 
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "GET"
    })
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      clearTripModal();
      populateEditModal(responseJson); 
    })
    .catch(error => console.log('Bad request'));
}

// populates modal with trip for edition
function populateEditModal(responseJson) {
  $('.entry-input').val(`${responseJson.destination}`);
  $('.when').val(`${responseJson.when}`);
  $('.lastDayTrip').val(`${responseJson.lastDayOfTrip}`);
  $('#description-field').val(`${responseJson.tripDetails}`);
};

//opens modal for editing
function openModal() {
  $('.container').addClass('opaque'); 
  $('.js-submit-button').hide();
  $('.js-edit-submit-button').show();
  $('.js-modal-container').show();
}

//listens for when user submits edit
function listensForEditSubmit(tripID) {
  $('.js-edit-submit-button').on('click', function(event) {
    console.log('js-edit-submit-button, click', tripID);
    event.preventDefault();
    let editedTrip = {};    
    editedTrip.destination = $('.entry-input').val();
    editedTrip.when = $('.when').val();
    editedTrip.lastDayOfTrip = $('.lastDayTrip').val();
    editedTrip.tripDetails = $('#description-field').val();
    editedTrip.id = tripID;
    submitEditEntry(editedTrip, tripID);

  });
}

//submits edits trip
function submitEditEntry(editedTrip, tripID) {
 fetch(`api/trips/${tripID}`, 
 {
  headers: {
    'Accept': 'application/json',
    'Content-Type' : 'application/json',
  },
  method: "PUT",
  body: JSON.stringify(editedTrip)
 })
 .then(response => {
    hideModal();
    fetchTrips();
 })
 .catch(error => console.log('error'));
}

//// deletes entry DEL/:id ////

//listens for when user selects delete
function getIdToDelEntry()  {
  $('.js-trips-container').on('click', '.js-delete-button', function(event) {
    event.preventDefault()
    const delTripID = $(event.target)[0].attributes[1].nodeValue;
    if ( !confirm("Are you sure you want to delete this trip?")) return alert("Saying yes to vacation, I like it!")
    deleteEntry(delTripID); 
    console.log(delTripID)
  });
}

//deletes trip entry
function deleteEntry(delTripID) {
  fetch(`/api/trips/${delTripID}`,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "DELETE",
    body: JSON.stringify(delTripID)
  })
  .then(response => {
    fetchTrips();
    return response.json();
    
  })
  .catch(error => console.log('Bad request'));
}

//////// manipulation of data ////






///// countdown clock /////

//gets remaining time to date
function getTimeRemaining(startTime) {
  let t = Date.parse(startTime) - Date.parse(new Date());
  return {
    total: t,
    days: Math.floor(t / (1000 * 60 * 60 * 24)),
    hours: Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((t / 1000 / 60) % 60),
    seconds: Math.floor((t / 1000) % 60)
  };
}

//initializes clock
function initializeClock(trip) {

  let startTime = new Date(Date.parse(new Date(trip.when)))  

  let clock = $(`#${trip.id}`).find(".clockdiv");
  let daysSpan = clock.find('.days');
  let hoursSpan = clock.find('.hours');
  let minutesSpan = clock.find('.minutes');
  let secondsSpan = clock.find('.seconds');

  function updateClock() {
    var t = getTimeRemaining(startTime);

    daysSpan.html(t.days);
    hoursSpan.html(('0' + t.hours).slice(-2));
    minutesSpan.html(('0' + t.minutes).slice(-2));
    secondsSpan.html(('0' + t.seconds).slice(-2));

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

 // updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}



