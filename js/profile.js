$(document).ready(function () {
  if (window.sessionStorage.getItem("loggedIn") == "true") {
    var username = window.sessionStorage.getItem("username");
  }
  tags = [];
  $.get("/getDefaultTags", $.param({ username: username }), function (data) {
    tags = data;
    console.log("getting personalized data");
    console.log(username);
    console.log(tags);

    form = document.getElementById("taxonomyForm");
    $(form).find(":input").each(function () {
      if(tags.includes($(this).val())) {
        $(this).prop('checked', true);
      }
    });
  });
});

function updateProfile(form) {
  var username = window.sessionStorage.getItem("username");
  tags = [];
  $(form).find(":input").each(function () {
      if ($(this).is(":checked")) {
        tags.push($(this).val());
      }
  });
  var info = {
    tags: tags,
    username: username,
  };
  console.log(info);
  $.get("/insertDefaultTags", $.param(info), function (data) {
    if (data == "There was an error accessing your account") {
      $("#taxonomyError").text(data);
    } else {
      console.log(data);
      window.location.href = "index.html";
    }
  });
}
