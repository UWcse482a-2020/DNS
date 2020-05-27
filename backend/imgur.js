// Script to upload all google drive linked photos to imgur
// Does not need to be run again!

var request = require('request');
const database = require("./connect")
const delay = interval => new Promise(resolve => setTimeout(resolve, interval));
var data = []

database.queryDb({"ImgurLink": null}, function (result) {
    data = result;
    data.forEach(addImgurLink)
})

async function addImgurLink(product) {
    console.log("ProductID: " + product.ProductId)
    if (product.Image.substring(0, 6) !== '../img') {
        await delay(3000);
        var id = product.Image.substring(product.Image.indexOf("id="), product.Image.length);
        var uploadurl = "https://drive.google.com/uc?export=view&" + id;
        console.log(uploadurl);
        var options = {
            'method': 'POST',
            'url': 'https://api.imgur.com/3/image',
            'headers': {
                'Authorization': 'Client-ID ecfd06bab7d411e'
            },
            formData: {
                'image': uploadurl
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var body = JSON.parse(response.body);
            console.log(body);
            database.insertField(product.ProductId, body.data.link);
        });
    }
}