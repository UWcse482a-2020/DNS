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

document.getElementById("search-btn").addEventListener("click", searchButtonClick);
function searchButtonClick() {
    var query = getQueryString();
    $.get("/searchquery", $.param(query), function (data) {
        console.log(data);
        window.sessionStorage.removeItem("queryResult");
        window.sessionStorage.setItem("queryResult", JSON.stringify(data));
        window.sessionStorage.removeItem("userQuery");
        window.sessionStorage.setItem("userQuery", JSON.stringify(query));
        window.location.href = "categories.html";
    })    
}

function getQueryString() {
    var queryString = {};
    $("#tags li").each(function() {
        let tagText = $(this).text();
        let content = tagText.substr(0, tagText.length - 1);
        if ($(this).hasClass('device-type')) {
            queryString["Type"] = content;
        } else {
            queryString[content] = "yes";
        }
    });
    var Q = {
        query: queryString
    };
    return Q;
}

/*-------------------
		tag addition
--------------------- */
$('#tag-select').change(function () {
    var name = $(this).val();
    var tagList = [];
    $("#tags li").each(function () {
        tagList.push($(this).text());
    });
    if (!tagList.includes(name + "x")) {
        $("#tags").append("<li class='device-type'>" + name + "<span class='close'>x</span></li>");
    }
});
$('#feature-select').change(function () {
    var name = $(this).val();
    var tagList = [];
    $("#tags li").each(function () {
        tagList.push($(this).text());
    });
    if (!tagList.includes(name + "x")) {
        $("#tags").append("<li class='feature'>" + name + "<span class='close'>x</span></li>");
    }
});

$(document).on("click", '.close', function () {
    $(this).parent().remove();
});