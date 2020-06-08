const products = JSON.parse(window.sessionStorage.getItem("queryResult"));
const userQuery = JSON.parse(window.sessionStorage.getItem("userQuery")).query;

function setupCard(product, cardNum) {

    const div_singleProd = document.createElement('div')
    div_singleProd.setAttribute('class', "single-product-item")
    div_singleProd.setAttribute('style', "position: relative; width: 25%; padding-right: 15px; padding-left: 15px;")

    const a_img = document.createElement('a')
    a_img.setAttribute('id', 'a_img_href' + cardNum)
    a_img.setAttribute('href', './product-page.html?ProductId=' + product.ProductId)
    a_img.setAttribute('tabindex', '0')


    const figure = document.createElement('figure')

    const img = document.createElement('img')
    var imageLink = product.Image.substring(0, 6) === "../img" ? product.Image : product.ImgurLink;
    img.setAttribute('src', imageLink)
    img.setAttribute('alt', 'Image of ' + product.Name)

    const div_prodText = document.createElement('div')
    div_prodText.setAttribute('class', "product-text")

    const a_product = document.createElement('a')
    // TODO: Need to customize product page link 
    a_product.setAttribute('id', "a_product_href" + cardNum)
    a_product.setAttribute('href', "./product-page.html?ProductId=" + product.ProductId)
    a_product.setAttribute('tabindex', '0')

    const h6_product = document.createElement('h6')
    h6_product.innerHTML = product.Name
    h6_product.setAttribute('tabindex', '0')

    div_singleProd.append(a_img)
    a_img.append(figure)
    figure.append(img)

    div_singleProd.append(div_prodText)
    div_prodText.append(a_product)
    a_product.append(h6_product)

    $("#productgrid").append(div_singleProd);

}

function parseDisplayableTag(element, tag) {
    if (tag === "Type" || tag === "$search") {
        return element[tag];
    } else {
        return tag;
    }
}

function buildTitleAndBreadcrumb() {
    var readableQuery = "";
    var hasType = false;
    var isBrowseAll = false;
    if (userQuery === "{}") {
        readableQuery = "All Products";
        isBrowseAll = true;
    } else if (userQuery.hasOwnProperty("$or")) {
        var counter = 0;
        userQuery["$or"].forEach((element) => {
            if (counter > 0) {
                readableQuery += ", "
            }
            if (element != {}) {
                var key = Object.getOwnPropertyNames(element)[0];
                readableQuery += parseDisplayableTag(element, key);
                counter++;
            }
        });
    } else if (userQuery.hasOwnProperty("$and")) {
        var counter = 0;
        userQuery["$and"].forEach((element) => {
            if (counter > 0) {
                readableQuery += ", "
            }
            var key = Object.getOwnPropertyNames(element)[0];
            if (key != undefined) {
                if (key === "$or") {
                    element["$or"].forEach((subel) => {
                        if (counter > 0) {
                            readableQuery += ", "
                        }
                        if (subel != {}) {
                            var key2 = Object.getOwnPropertyNames(subel)[0];
                            readableQuery += parseDisplayableTag(subel, key2);
                            counter++;
                        }
                    });
                } else if (key === "$text") {
                    var string = parseDisplayableTag(element["$text"], "$search");
                    readableQuery += string.substring(1, string.length - 1);
                }
                else {
                    readableQuery += parseDisplayableTag(element, key);
                }
                counter++;
            }

        });
    } else if (userQuery.hasOwnProperty("$text")) {
        var string = parseDisplayableTag(userQuery["$text"], "$search");
        readableQuery += string.substring(1, string.length - 1);
    } else {
        var counter = 0;
        for (var x in userQuery) {
            if (counter > 0) {
                readableQuery += ", "
            }
            readableQuery += parseDisplayableTag(userQuery, x);
            counter++;
        }
    }

    $('.page-breadcrumb').append("<h2 class=\"col-lg-10\" tabindex='0'> " + products.length + " Search Results for \"" + readableQuery + "\"</h2>")
    if (!isBrowseAll) {
        $('.page-breadcrumb').append("<a href='./categories.html' tabindex='0' id='all-products'>All Products / </a>")
    }
    if (hasType) {
        $('.page-breadcrumb').append("<a class='active' href='./categories.html' tabindex='0'>" + userQuery.Type + "</a>")
    }
}

function setupGrid() {
    if (products.length == 0) {
        const h5_text = document.createElement('h5')
        h5_text.innerHTML = "No matching products were found. Please try a different search"
        $("#productgrid").append(h5_text);
        $('#goback').append("<a href=\"./index.html\" class=\"primary-btn\">Search Again</a>")
    } else {
        for (let cardNum = 0; cardNum < products.length; cardNum++) {
            setupCard(products[cardNum], cardNum)
        }
    }
}

buildTitleAndBreadcrumb()
setupGrid()