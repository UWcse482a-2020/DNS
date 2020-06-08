$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("loggedIn") == "true") {
        window.sessionStorage.removeItem("justRegistered");
        window.sessionStorage.setItem("loggedIn", "false");
        window.sessionStorage.removeItem("username");
    }
    window.location.href = "index.html";
    console.log("logging out");
});