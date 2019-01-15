//init function 
$(() => {
    loginEntry();
});

//checks for authentication 
function checkForJTW() {
    let authToken = localStorage.getItem('authToken')
    if (authToken) {
      showDashboard();
    }
}

//listens for submit of login
function loginEntry() {
    $('.js-login-form').on('submit', function(event) {
        event.preventDefault();
        let user = {};
        user.username = $('.js-username').val();
        user.password = $('.js-password').val();
        submitLogin(user);
        $('.js-username').val('');
        $('.js-password').val('');
    })
}

//submits login
function submitLogin(user) {
fetch('api/auth/login',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
        method: "POST",
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        localStorage.setItem('authToken', data.authToken);   
        //redirect 
        res.redirect('/dashboard.html')
    })
    .catch($('.js-login-error-status').text(response.message));
}

//I need to redirect in strategies****
