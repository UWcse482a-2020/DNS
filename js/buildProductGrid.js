const jquery = require('jquery')
//
$ = window.$ = window.jQuery = jquery;

// incrementing variable for unique ids and parsing
var cardNum = 0;

const products = [
    {
        Name: "Yellow Maxi Dress",
        Image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
    },
    {
        Name: "One Piece Bodysuit",
        Image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
    }
]

function test() { 
    console.log("Test function working")
}

function setupCard(product, rowNum) {
	// getFileTypes(); // retrieves file types
	// $("#selectFileType").on("change", function() {

    //     <div class="col-lg-6 col-md-6">
    //     <div class="single-product-item">
    //         <figure>
    //             <img src="../img/products/img-2.jpg" alt="">
    //             <div class="p-status sale">sale</div>
    //         </figure>
    //         <div class="product-text">
    //             <a href="./product-page.html"><h6>Yellow Maxi Dress</h6></a>  
    //             <p>$25.90</p>
    //         </div>
    //     </div>
    // </div>

        console.log("setupCard start")

        const div_outer = document.createElement('div')
        div_outer.setAttribute('class', 'col-lg-6 col-md-6') 

        const div_singleProd = document.createElement('div')
        div_singleProd.setAttribute('class', "single-product-item")

        const figure = document.createElement('figure')

        // TODO: Need alt text! 
        const img = document.createElement('img')
        img.setAttribute('src', product.Image)

        const div_prodText = document.createElement('div')
        div_prodText.setAttribute('class', "product-text")

        const a_product = document.createElement('a')
        a_product.setAttribute('href', "./product-page.html")

        const h6_product = document.createElement('h6')
        h6_product.innerHTML = product.Name

        div_outer.append(div_singleProd)
        div_singleProd.append(figure)
        figure.append(img)
        div_singleProd.append(div_prodText)
        div_prodText.append(a_product)
        a_product.append(h6_product)

        $("#rowContainer2" + rowNum).append(div_outer);
        
        console.log("setupCard end")
	// });
}

function setupGrid() { 
    var entriesPerRow = 4;
    // var totalRows = products.size % 4;
    var totalRows = 1;

    console.log("Outside forloop")

    // let rowNum = 1

    // const rowContainer1 = document.createElement('div')
    // rowContainer1.setAttribute('class', 'col-lg-6 col-md-6')
    // rowContainer1.setAttribute('id', 'rowContainer1' + rowNum)

    // const rowContainer2 = document.createElement('div');
    // rowContainer2.setAttribute('class', 'row')
    // rowContainer2.setAttribute('id', 'rowContainer2' + rowNum)

    // rowContainer1.append(rowContainer2)
    // $("#productgrid").append(rowContainer1)

    for (let rowNum = 1; rowNum <= totalRows; rowNum++) { 
        // Append new row-div to the overarching div (id "productgrid")
        const rowContainer1 = document.createElement('div')
        rowContainer1.setAttribute('class', 'col-lg-6 col-md-6')
        rowContainer1.setAttribute('id', 'rowContainer1' + rowNum)

        const rowContainer2 = document.createElement('div');
        rowContainer2.setAttribute('class', 'row')
        rowContainer2.setAttribute('id', 'rowContainer2' + rowNum)

        rowContainer1.append(rowContainer2)
        $("#productgrid").append(rowContainer1)

        // Set up productsPerRow cards per row 
        // for (let rowEntryNum = 1; rowEntryNum <= entriesPerRow && cardNum < products.size; rowEntryNum++) { 
        for (let rowEntryNum = 1; rowEntryNum < 3; rowEntryNum++) { 
            console.log("In entry forloop")
            setupCard(products[cardNum], rowNum)
            cardNum++;
        }
    }

    console.log("End of grid method")

}
setupGrid()