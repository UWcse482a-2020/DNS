const { MongoClient } = require("mongodb");
const url = "mongodb+srv://482user:Hackccess20@cluster0-me5jz.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url);

var methods = {
    queryDb: function (query, callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            //var query = {"Type":"Switch","Moves":"yes"};
            return dbo.collection("Products").find(query).toArray(function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    checkUserExists: function (query, callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("Users").count(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    registerUser: function (query, callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("Users").insert(query, function (err, result) {
                if (err) throw err;
                console.log("user insert")
            });
        });
    },

    loginUser: function (query, callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("User").find(query).toArray(function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    }


}
module.exports = methods;