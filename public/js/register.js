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
        return response.json()
    })
    .then(response => {
        if (response !== 201) {
            $('.js-signup-status').text(response.location +":   "+ response.message);
            }
            else {   
             $('.js-signup-status').text('Signup successful. Please log in.')
            }
        
    })
    .catch(error => console.log('Bad request'));
};
