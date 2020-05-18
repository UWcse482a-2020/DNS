function register(info) {
    var registerInfo = {
        username: info.username.value,
        email: info.email.value,
        password: info.password.value
    }
    console.log(registerInfo);
    $.post("/register", $.param(registerInfo), function (data) {
        $('#registerError').text("You have registered successfully")
    })
}