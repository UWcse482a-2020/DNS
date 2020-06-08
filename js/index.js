// JS specific to index.html

$(document).ready(function () {
  // check if user is logged in
  if (window.sessionStorage.getItem("loggedIn") == "true") {
    var username = window.sessionStorage.getItem("username");
    $("#welcome-message").text(
      "Welcome back " + username + ", what are you looking for today?"
    );
  }
});
