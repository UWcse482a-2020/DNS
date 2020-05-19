const products = JSON.parse(window.sessionStorage.getItem("queryResult"));

function setupCard(product, cardNum) {
    // <div class="col-lg-6 col-md-6">
    //     <div class="single-product-item">
    //         <a href="./product-page.html">
    //             <figure>
    //                 <img alt="W3Schools" src="../img/products/img-2.jpg">
    //             </figure>
    //         </a>
    //         <div class="product-text">
    //             <a href="./product-page.html"><h6>Yellow Maxi Dress</h6></a>  
    //             <p>$25.90</p>
    //         </div>
    //     </div>
    // </div>

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

function setupGrid() {
    for (let cardNum = 0; cardNum < products.length; cardNum++) { 
        setupCard(products[cardNum], cardNum)
    }
}

setupGrid()