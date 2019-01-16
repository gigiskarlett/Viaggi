//verifies password match 
$('#js-password, #js-confirm-password').on('keyup', function(event) {
    if ($('#js-password').val() == $('#js-confirm-password').val()) {
        $('#js-error-message').html('Passwords Match');
    } else {
        $('#js-error-message').html(`Password Doesn't Match`);
    }       
});  

//listens for submit of new user 
$('.js-submit-form').on('click', '.js-signup-button', function(event) {
    event.preventDefault();
    let newUser = {};
    newUser.username = $('.js-username').val();
    newUser.fullName = $('.js-full-name').val();
    newUser.password = $('.js-password').val();
    submitUser(newUser)
    $('.js-username').val('');
    $('.js-full-name').val('')
    $('.js-password').val('');
});


function submitUser(newUser) {
    fetch('/api/users', 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (response.status === 201) {
            window.location.href = "/login.html";  
        }
        else {   
           return response.json()
        }
        
    })
    .then(response => {
      $('.js-signup-status').text(response.location +":   "+ response.message);
    })
    .catch(error => console.log('Bad request'));
};