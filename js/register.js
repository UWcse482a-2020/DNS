function register(info) {
    var registerInfo = {
        username: info.username.value,
        email: info.email.value,
        password: info.password.value,
        tags: []
    }
    console.log(registerInfo);
    $.get("/register", $.param(registerInfo), function (data) {
        $('#registerError').text(data);
        if(data == "Registration Successful.") {
            window.sessionStorage.setItem("justRegistered", "true");
            window.sessionStorage.setItem("loggedIn", "true");
            window.sessionStorage.setItem("username", registerInfo.username);
            //window.location.href = "login.html";
            // change to setup profile
            window.location.href = "taxonomy.html";
            // automatically sign in
        }
    })

}