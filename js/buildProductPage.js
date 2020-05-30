$(document).ready(function () {
    var products = JSON.parse(window.sessionStorage.getItem("queryResult"));
    var urlParams = new URLSearchParams(window.location.search);
    var product = {};
    if (products == null) {
        var Q = {
            query: { 'ProductId': urlParams.get("ProductId") }
        };
        $.get("/searchquery", $.param(Q), function (data) {
            product = data[0];
            setupProduct(product);
        });
    } else {
        product = products.find(element => element.ProductId === urlParams.get("ProductId"));
        setupProduct(product);
    }
});


function getProductAvailability(status) {
    const caps_status = status.toUpperCase()
    if (caps_status === "YES") {
        return "Available"
    }

    if (caps_status === "NO" || caps_status === "") {
        return "Not Available"
    }
}

const validFeatures = {
    "Cognitive-age": "Cognitive Age",
    "sound-off": "Sounds can be off",
    "sound-loud": "Sounds are loud",
    "Moves": "Moves",
    "lights-off": "Lights can be off",
    "lights-bright": "Lights bright or pulsating",
    "av-alt": "Audio/Visual output alternatives",
    "input-small": "Input features are small",
    "input-difficult": "Input features hard to manipulate/press",
    "touch-input": "Touch input features",
    "textured": "Has textural differences",
    "switch-acc": "Accessible by ability switches",
    "eye-acc": "Acessible by eye-tracking devices",
    "accessible by voice interface?": "Accessible by voice-interface",
}


function setupProduct(product) {
    /*product = {
        "_id": {
            "$oid": "5ec16e50cac0241e5c1d2374"
        },
        "ProductId": "1",
        "Name": "AAA Battery Interrupter",
        "Inventory": "LL-AD1001",
        "Image": "../img/tempImages/AAA Battery Interrupter.jpg",
        "Link": "https://drive.google.com/a/provail.org/file/d/1rHYeMLlbI37WcK4fUENUwM5SAJpctcvC/view?usp=sharing",
        "Type": "Adapter",
        "Availability": "Available",
        "Condition": "Fair",
        "Company": "Custom/Volunteer",
        "Notes": "This battery interrupter was custom made by a PROVAIL volunteer. It is used as a simple switch access solution for a toy (or other electronic device) that is battery operated and in an always on or always off state. This particular model is for devices that use a AAA sized battery. **$10.00 replacement cost.",
        "Cognitive-age": "any",
        "sound-off": "N/A",
        "sound-loud": "N/A",
        "Moves": "N/A",
        "lights-off": "N/A",
        "lights-bright": "N/A",
        "av-alt": "N/A",
        "input-small": "N/A",
        "input-difficult": "N/A",
        "touch-input": "N/A",
        "textured": "N/A",
        "switch-acc": "Yes",
        "eye-acc": "N/A",
        "accessible by voice interface?": "N/A",
        "buyable": "Yes",
        "buy-link": "https://enablingdevices.com/product/battery-interrupters/",
        "borrowable": "Yes",
        "borrow-loc": "PROVAIL",
        "makable": "",
        "make-link": ""
    }*/

    // Menu Stuff
    $('#breadcrumb').append("<h2 tabindex='0'>" + product.Name + "</h2>")
    $('#breadcrumb').append("<a href='#' tabindex='0'>All Products / </a>")
    $('#breadcrumb').append("<a class='active' href='./categories.html' tabindex='0'>" + product.Type + "</a>")

    // Photo stuff
    const img_prodImg = document.createElement('img')
    var imageLink = product.Image.substring(0, 6) === "../img" ? product.Image : product.ImgurLink;
    img_prodImg.setAttribute('src', imageLink)
    img_prodImg.setAttribute('alt', 'Image of ' + product.Name)
    img_prodImg.setAttribute('tabindex', '0')
    $('#image').append(img_prodImg)

    // Video Stuff (Hardcoded, for demonstration only)
    console.log("hi");
    if (product.ProductId == 51) { 
        $('#video').append("<iframe src='https://drive.google.com/file/d/10X-ncURK-q2DAJtfsx6fWS4hIYokzlv6/preview' width='100%'></iframe>");
    }
    if (product.ProductId == 3) { 
        $('#video').append("<iframe src='https://drive.google.com/file/d/1rHYeMLlbI37WcK4fUENUwM5SAJpctcvC/preview' width='100%'></iframe>"); 
    }

    // $("#title").append("<h2>" + product.Name + "</h2>")
    $("#desc").append("<p tabindex='0'>" + product.Notes + "</p>")

    $("#category").append("<span tabindex='0'> Product Type: </span>" + product.Type)

    function generateGetInfo(mode) {
        $("#get-info").append("<div style='margin-top: 0px; margin-bottom: 20px'>")

        const description = (mode === "buy") ? "Purchase from a retailer: "
            : (mode === "borrow") ? "Borrow from a partner: "
                : "Make from instructions: "

        const availability = (mode === "buy") ? getProductAvailability(product.buyable)
            : (mode === "borrow") ? getProductAvailability(product.borrowable)
                : getProductAvailability(product.makable)

        $("#get-info").append("<span style='font-size: 18px' tabindex='0'>" + description + availability + "</span>")

        let redirect = (mode === "buy") ? product['buy-link']
            : (mode === "borrow") ? product['borrow-loc']
                : product['make-link']

        if (redirect === "https://provail.org/") { 
            redirect = "https://docs.google.com/forms/d/e/1FAIpQLScpE4-eZF0djVPW-D6StWxH5ADoyeqj1Pc7-Qc-BpjEExucnQ/viewform?usp=pp_url&entry.1617628070=" + product.Inventory;
        }

        const link = (redirect === "") ? "" : redirect
        const a_href = document.createElement('a')
        a_href.setAttribute('href', link)
        a_href.setAttribute('tabindex', '0')


        const button = document.createElement('button')
        button.setAttribute('class', 'btn btn--primary')
        button.setAttribute('tabindex', '0')
        button.setAttribute('role', 'button')
        const buttonText = (mode === "buy") ? "Link to Purchase"
            : (mode === "borrow") ? "Link to Borrow"
                : "Link to Make"
        button.innerHTML = buttonText
        if (link === "" || availability === "Not Available") {
            button.disabled = true;
        }

        a_href.append(button)

        $("#get-info").append(a_href)

        $("#get-info").append("</div>")
    }

    generateGetInfo("buy")
    generateGetInfo("borrow")
    generateGetInfo("make")

    Object.keys(validFeatures).forEach(function (key) {
        $('#features-product').append("<li tabindex='0'>" + validFeatures[key] + ": " + product[key] + "</li>")
    })

    $("#fbComments").append("<div class='fb-comments' data-href='https://assistivetechlib.herokuapp.com/product-page.html?ProductId=" + product.ProductId + " data-numposts='10' data-width='540'></div>");


}
