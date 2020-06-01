function register(info) {
    var registerInfo = {
        username: info.username.value,
        email: info.email.value,
        password: info.password.value
    }
    console.log(registerInfo);
    $.get("/register", $.param(registerInfo), function (data) {
        $('#registerError').text(data);
        if(data == "Registration Successful.") {
            window.sessionStorage.setItem("justRegistered", "true");
            window.location.href = "login.html";
            // change to setup profile
            // automatically sign in
        }
    })
}