const products = JSON.parse(window.sessionStorage.getItem("queryResult"));

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
    var urlParams = new URLSearchParams(window.location.search);
    product = products.find(element => element.ProductId === urlParams.get("ProductId"));
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
    $('#breadcrumb').append("<h2>" + product.Name + "</h2>")
    $('#breadcrumb').append("<a href='#'>All Products</a>")
    $('#breadcrumb').append("<a class='active' href='#'>" + product.Type + "</a>")

    // Photo stuff
    const img_prodImg = document.createElement('img')
    img_prodImg.setAttribute('src', product.Image)
    img_prodImg.setAttribute('alt', 'Image of ' + product.Name)
    $('#image').append(img_prodImg)

    // $("#title").append("<h2>" + product.Name + "</h2>")
    $("#desc").append("<p>"+ product.Notes + "</p>")

    $("#category").append("<span> Product Type: </span>" + product.Type)

    function generateGetInfo(mode) { 
        $("#get-info").append("<div style='margin-top: 0px; margin-bottom: 20px'>")

        const description = (mode === "buy") ? "Purchase from a retailer: " 
                            : (mode === "borrow") ? "Borrow from a partner: "
                            : "Make from instructions: "

        const availability = (mode === "buy") ? getProductAvailability(product.buyable)
                            : (mode === "borrow") ? getProductAvailability(product.borrowable)
                            : getProductAvailability(product.makable)

        $("#get-info").append("<span style='font-size: 18px'>" + description + availability + "</span>")

        const redirect = (mode === "buy") ? product['buy-link']
                            : (mode === "borrow") ? product['borrow-loc']
                            : product['make-link']
        const link = (redirect === "") ? "" : redirect
        const a_href = document.createElement('a')
        a_href.setAttribute('href', link)


        const button = document.createElement('button')
        button.setAttribute('class', 'btn btn--primary')
        const buttonText = (mode === "buy") ? "Link to Purchase"
                            : (mode === "borrow") ? "Link to Borrow"
                            : "Link to Make"
        button.innerHTML = buttonText
        if (link === "") {
            button.disabled = true;
        }
        
        a_href.append(button)
        
        $("#get-info").append(a_href)

        $("#get-info").append("</div>")
    }

    generateGetInfo("buy")
    generateGetInfo("borrow")
    generateGetInfo("make")

    Object.keys(validFeatures).forEach(function(key) {
        $('#features-product').append("<li>" + validFeatures[key] + ": " + product[key] + "</li>")
    }) 

}

setupProduct()