const products = JSON.parse(window.sessionStorage.getItem("queryResult"));
const userQuery = JSON.parse(window.sessionStorage.getItem("userQuery")).query;

function setupCard(product, cardNum) {

    const div_singleProd = document.createElement('div')
    div_singleProd.setAttribute('class', "single-product-item")
    div_singleProd.setAttribute('style', "position: relative; width: 25%; padding-right: 15px; padding-left: 15px;")

    const a_img = document.createElement('a')
    a_img.setAttribute('id', 'a_img_href' + cardNum)
    a_img.setAttribute('href', './product-page.html?ProductId=' + product.ProductId)

    const figure = document.createElement('figure')

    const img = document.createElement('img')
    img.setAttribute('src', product.Image)
    img.setAttribute('alt', 'Image of ' + product.Image)

    const div_prodText = document.createElement('div')
    div_prodText.setAttribute('class', "product-text")

    const a_product = document.createElement('a')
    // TODO: Need to customize product page link 
    a_product.setAttribute('id', "a_product_href" + cardNum)
    a_product.setAttribute('href', "./product-page.html?ProductId=" + product.ProductId)

    const h6_product = document.createElement('h6')
    h6_product.innerHTML = product.Name

    div_singleProd.append(a_img)
    a_img.append(figure)
    figure.append(img)

    div_singleProd.append(div_prodText)
    div_prodText.append(a_product)
    a_product.append(h6_product)

    $("#productgrid").append(div_singleProd);
    
}

function buildTitleAndBreadcrumb() {
    var readableQuery = "";
    var hasType = false;
    var isBrowseAll = false;
    if (userQuery === "{}") {
        readableQuery = "All Products";
        isBrowseAll = true;
    } else {
        var counter = 0;
        for (var x in userQuery) {
            if (counter > 0) {
                readableQuery += ", "
            } 
            if (x === "Type") {
                readableQuery += userQuery[x];
                hasType = true;
            } else {
                readableQuery += x;
            }
            counter++;
        }
    }
    
    $('.page-breadcrumb').append("<h2 class=\"col-lg-10\"> " + products.length + " Search Results for \"" + readableQuery + "\"</h2>")
    if (!isBrowseAll) {
        $('.page-breadcrumb').append("<a href='#'>All Products / </a>")
    }
    if (hasType) {
        $('.page-breadcrumb').append("<a class='active' href='./categories.html'>" + userQuery.Type + "</a>")
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