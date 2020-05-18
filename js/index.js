// JS specific to index.html

document.getElementById("search-btn").addEventListener("click", searchButtonClick);
function searchButtonClick() {
    $.get("/searchquery", function (data) {
        console.log(data);
    })
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
        $("#tags").append("<li>" + name + "<span class='close'>x</span></li>");
    }
});
$('#feature-select').change(function () {
    var name = $(this).val();
    var tagList = [];
    $("#tags li").each(function () {
        tagList.push($(this).text());
    });
    if (!tagList.includes(name + "x")) {
        $("#tags").append("<li>" + name + "<span class='close'>x</span></li>");
    }
});

$(document).on("click", '.close', function () {
    $(this).parent().remove();
});