
$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("justRegistered") == "true") {
        window.sessionStorage.removeItem("justRegistered");
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
        $('#loginError').text(data);
        if (data == "Log in Successful") {
            window.sessionStorage.setItem("loggedIn", "true");
            window.sessionStorage.setItem("username", loginInfo.username);
            window.sessionStorage.removeItem("Default_tags");
            var tags = ["Toy", "textured"]
            window.sessionStorage.setItem("Default_tags", JSON.stringify(tags));
            window.location.href = "index.html";
        }
    })
}