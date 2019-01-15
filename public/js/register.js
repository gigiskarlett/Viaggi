//init function
$(() => {
    newUserEntry() 
});

//listens for submit of new user 
function newUserEntry() {
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
};

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