const { MongoClient } = require("mongodb");
const url = "mongodb+srv://482user:Hackccess20@cluster0-me5jz.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url);
var resultArray = [];

var methods = {
    queryDb: function () {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            console.log("inside client.connect")
            var dbo = db.db("AssistiveTechLib");
            var query = { "Type": "Switch" };
            dbo.collection("Products").find(query).toArray(function (err, result) {
                if (err) throw err;
                resultArray.push(result);
                client.close();
                //return resultArray;
            });
        });
        console.log("out of client connect");
    }
}


module.exports = methods;