//init function 
$(() => {
    loginEntry();
});

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
    .then(response =>{
         if (response.status === 401) {
            $('.js-login-error-status').text("Incorrect username or password")
        }else{
            return response.json()
        }
    })
    .then(data => {
        localStorage.setItem('authToken', data.authToken);   
        window.location.href = "/dashboard.html";
    })
    .catch(err=>{
        console.log(err)
    });
}
