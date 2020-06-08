function register(info) {
    var registerInfo = {
        username: info.username.value,
        email: info.email.value,
        password: info.password.value,
        tags: []
    }
    console.log(registerInfo);
    $.get("/register", $.param(registerInfo), function (data) {
        
        if(data == "Registration Successful.") {
            $('#registerError').css("color", "blue");
            $('#registerError').text(data);
            window.sessionStorage.setItem("justRegistered", "true");
            window.sessionStorage.setItem("loggedIn", "true");
            window.sessionStorage.setItem("username", registerInfo.username);
            //window.location.href = "login.html";
            // change to setup profile
            window.location.href = "taxonomy.html";
            // automatically sign in
        } else {
            $('#registerError').css("color", "red");
            $('#registerError').text(data);
        }
    })

}