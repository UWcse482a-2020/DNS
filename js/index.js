// JS specific to index.html

$(document).ready(function () {
  //dynamically put in tags
  $.get("/getTags", function (data) {
    typeTags = data[0];
    featureTags = data[1];
    console.log("retrieving tags");
    console.log(typeTags);
    console.log(featureTags);
    typeTags.forEach(function (item, index) {
      $("#tag-select").append("<option>" + item + "</option>");
    });
    featureTags.forEach(function (item, index) {
      $("#feature-select").append("<option>" + item + "</option>");
    });
  });

  // check if user is logged in
  if (window.sessionStorage.getItem("loggedIn") == "true") {
    var username = window.sessionStorage.getItem("username");
    defaultTagList = [];
    $.get("/getDefaultTags", $.param({ username: username }), function (data) {
      defaultTagList = data;
      console.log("getting personalized data");
      console.log(username);
      console.log(defaultTagList);
      $("#welcome-message").text(
        "Welcome back " + username + ", what are you looking for today?"
      );
      defaultTagList.forEach(function (item, index) {
        console.log("added to tag column");
        $("#tags").append(
          "<li class='device-type' tabindex=0>" +
            item +
            "<button class='search-tag-close' tabindex=0>x</button></li>"
        );
      });
    });
  }
});
