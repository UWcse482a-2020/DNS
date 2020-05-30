// JS specific to index.html

$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("loggedIn") == "true") {
        var defaultTagList = JSON.parse(window.sessionStorage.getItem("Default_tags"))
        var username = window.sessionStorage.getItem("username")
        $('#welcome-message').text("Welcome back " + username + ", what are you looking for today?");
        defaultTagList.forEach(function(item, index) {
            console.log("added to tag column");
            $("#tags").append("<li class='device-type'>" + item + "<span class='close'>x</span></li>");
        });
    }
});