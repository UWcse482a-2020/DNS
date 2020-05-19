// JS specific to index.html

$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("loggedIn") == true) {
        console.log("logged in user detected");
        window.sessionStorage.getItem("Default_tags").forEach(function(item, index) {
            console.log("added to tag column");
            $("#tags").append("<li class='device-type'>" + item + "<span class='close'>x</span></li>");
        });
    } else {
        console.log("this doesn't work");
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