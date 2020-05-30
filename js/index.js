// JS specific to index.html

$(document).ready(function() {
    //dynamically put in tags
    $.get("/getTags", function (data) {
        typeTags = data[0];
        featureTags = data[1];
        console.log("retrieving tags");
        console.log(typeTags);
        console.log(featureTags);
        typeTags.forEach(function (item, index){
            $('#tag-select').append("<option>" + item + "</option>")
        });
        featureTags.forEach(function (item, index){
            $('#feature-select').append("<option>" + item + "</option>")
        });
    })
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