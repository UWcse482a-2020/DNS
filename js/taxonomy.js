function taxonomy(form) {
  var username = window.sessionStorage.getItem("username");
  tags = [];
  $(form)
    .find(":input")
    .each(function () {
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
