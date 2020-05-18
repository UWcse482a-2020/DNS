const jquery = require('jquery')
//
$ = window.$ = window.jQuery = jquery;

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
     product = {
        "_id": {
            "$oid": "5ec16e50cac0241e5c1d2374"
        },
        "ProductId": "1",
        "Name": "AAA Battery Interrupter",
        "Inventory": "LL-AD1001",
        "Image": "https://drive.google.com/open?id=1S9KhrRS7xFmE94deQKfhIzK4GaJHasuH",
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
    }

    console.log("Inside setupProduct")

    const div_prodImgOuter = document.createElement('div')
    div_prodImgOuter.setAttribute('class', 'col-lg-6')
    const div_prodImg = document.createElement('div')
    div_prodImg.setAttribute('class', 'product-img')
    const img_prodImg = document.createElement('div')
    img_prodImg.setAttribute('src', product.Image)
    img_prodImg.setAttribute('alt', 'Image of ' + product.Name)

    const div_prodContentOuter = document.createElement('div')
    div_prodContentOuter.setAttribute('class', 'col-lg-6')
    const div_prodContent = document.createElement('div')
    div_prodContent.setAttribute('class', 'product-content')

    const h2_title = document.createElement('h2')
    h2_title.innerHTML = product.Name

    const p_desc = document.createElement('p')
    p_desc.innerHTML = product.Notes

    const ul_prodType = document.createElement('ul')
    ul_prodType.setAttribute('class', 'tags')
    const li_prodType = document.createElement('li')
    li_prodType.setAttribute('id', "li_prodType" + product.ProductId)
    li_prodType.innerHTML = "Product Type: " + product.Type
    // $("#li_prodType" + product.ProductId).append("<span>Product Type:</span>" + product.Type)
    // const span_prodType = document.createElement('span')
    // span_prodType.innerHTML = "Product Type: "

    // const str_productType = "<ul class='tags'><li><span>Product Type:</span>" + product.Type + "</li></ul>"

    const p_buy = document.createElement('p')
    p_buy.innerHTML = "Purchase from a retailer: " + getProductAvailability(product.buyable)
    const p_borrow = document.createElement('p')
    p_borrow.innerHTML = "Borrow from a partner: " + getProductAvailability(product.borrowable)
    const p_make = document.createElement('p')
    p_make.innerHTML = "Make from instructions: " + getProductAvailability(product.makable)


    // Features
    const ul_features = document.createElement('ul')
    ul_features.setAttribute('class', 'p-info')
    ul_features.setAttribute('id', 'features-product')
    Object.keys(validFeatures).forEach(function(key) {
        console.log(validFeatures[key])
        // $('#features-product').append("<li>" + validFeatures[key] + ": " + product[key] + "</li>")
        const li = document.createElement('li')
        li.innerHTML = validFeatures[key] + ": " + product[key]
        ul_features.append(li)
    }) 

    ////////////////////////////////////////

    // Photo stuff
    div_prodImgOuter.append(div_prodImg)
    div_prodImg.append(img_prodImg)
    $('#product-row').append(div_prodImgOuter)

    // Content stuff

    div_prodContentOuter.append(div_prodContent)
    div_prodContent.append(h2_title)
    div_prodContent.append(p_desc)

    div_prodContent.append(ul_prodType)
    ul_prodType.append(li_prodType)

    div_prodContent.append(p_buy)
    div_prodContent.append(p_borrow)
    div_prodContent.append(p_make)

    div_prodContent.append(ul_features)

    $('#product-row').append(div_prodContentOuter)

    console.log("End setupProduct")
}

// function setupGrid() { 
//     var entriesPerRow = 4;
//     // var totalRows = products.size % 4;
//     var totalRows = 1;

//     console.log("Outside forloop")

//     for (let rowNum = 1; rowNum <= totalRows; rowNum++) { 
//         // Append new row-div to the overarching div (id "productgrid")
//         const rowContainer1 = document.createElement('div')
//         rowContainer1.setAttribute('class', 'col-lg-6 col-md-6')
//         rowContainer1.setAttribute('id', 'rowContainer1' + rowNum)

//         const rowContainer2 = document.createElement('div');
//         rowContainer2.setAttribute('class', 'row')
//         rowContainer2.setAttribute('id', 'rowContainer2' + rowNum)

//         rowContainer1.append(rowContainer2)
//         $("#productgrid").append(rowContainer1)
//     }
// }

setupProduct()