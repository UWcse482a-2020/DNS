// dynamically put in dropdown options
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

document.getElementById("search-btn").addEventListener("click", searchButtonClick);
function searchButtonClick() {
    var query = getQueryString();
    $.get("/searchquery", $.param(query), function (data) {
        window.sessionStorage.removeItem("queryResult");
        window.sessionStorage.setItem("queryResult", JSON.stringify(data));
        window.sessionStorage.removeItem("userQuery");
        window.sessionStorage.setItem("userQuery", JSON.stringify(query));
        window.location.href = "categories.html";
    })    
}

function getQueryString() {
    var queryString = {};
    var productTypes = [];
    var features = [];
    var andClause = {"$and": []};
    var orClause = {"$or": []};
    var textClause = {};
    var searchBarVal = document.getElementById("search-bar").value;
    $("#tags li").each(function() {
        let tagText = $(this).text();
        let content = tagText.substr(0, tagText.length - 1);
        if ($(this).hasClass("device-type")) {
            productTypes.push(content);
        } else {
            features.push(content);
        }
    });
    if (searchBarVal !== null) {
        // wrap in double quotes for an exact phrase search
        searchBarVal = "\"" + searchBarVal + "\"";
        textClause["$text"] = {'$search': searchBarVal};
    }
    if (productTypes.length == 0 && features.length == 0 && textClause != {}) {
        queryString = textClause;
    } else if (productTypes.length > 1) {
        // Allow for Multiple product type searches with the OR operator
        productTypes.forEach((content) => {
            orClause["$or"].push({"Type": content});
        })
        andClause["$and"].push(orClause);
        features.forEach((content) => {
            var feature = {};
            feature[content] = "yes";
            andClause["$and"].push(feature);
        })
        andClause["$and"].push(textClause);
        queryString = andClause;
    } else if (features.length > 1 && productTypes.length == 0) {
        // If no product type selected, OR add feature tags
        features.forEach((content) => {
            var feature = {};
            feature[content] = "yes";
            orClause["$or"].push(feature);
        });
        andClause["$and"].push(textClause);
        andClause["$and"].push(orClause);
        queryString = andClause;
    }
    else {
        // 1 product type, 1 or more features
        productTypes.forEach((content) => {
            //queryString["Type"] = content;
            andClause["$and"].push({"Type":content});
        })
        features.forEach((content) => {
            //queryString[content] = "yes";
            var feature = {};
            feature[content] = "yes";
            andClause["$and"].push(feature);
        })
        andClause["$and"].push(textClause);
        queryString = andClause;
    }
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
        $("#tags").append("<li class='device-type' tabindex=0>" + name + "<button class='search-tag-close' tabindex=0>x</button></li>");
    }
});
$('#feature-select').change(function () {
    var name = $(this).val();
    var tagList = [];
    $("#tags li").each(function () {
        tagList.push($(this).text());
    });
    if (!tagList.includes(name + "x")) {
        $("#tags").append("<li class='feature' tabindex=0>" + name + "<button class='search-tag-close' tabindex=0>x</button></li>");
    }
});

$(document).on("click", '.search-tag-close', function () {
    $(this).parent().remove();
});