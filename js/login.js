
$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("justRegistered") == "true") {
        window.sessionStorage.removeItem("justRegistered");
        $('#loginError').css("color", "blue");
        $('#loginError').text("Registered Successfully. Please Sign In.");
    }
});

function login(info) {
    var loginInfo = {
        username: info.username.value,
        password: info.password.value
    }
    console.log(loginInfo);
    $.get("/login", $.param(loginInfo), function (data) {
        if (data == "Log in Successful") {
            $('#loginError').css("color", "blue");
            $('#loginError').text(data);
            window.sessionStorage.setItem("loggedIn", "true");
            window.sessionStorage.setItem("username", loginInfo.username);
            window.sessionStorage.removeItem("Default_tags");
            var tags = ["Toy", "textured"]
            window.sessionStorage.setItem("Default_tags", JSON.stringify(tags));
            window.location.href = "index.html";
        } else {
            $('#loginError').css("color", "red");
            $('#loginError').text(data);
        }
        console.log(data);
    })
}