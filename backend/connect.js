const { MongoClient } = require("mongodb");
const url = "mongodb+srv://482user:Hackccess20@cluster0-me5jz.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url);

var methods = {
    queryDb: function (query, callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            //var query = {'$and':[{'$text': {'$search': '\"Wired controller compatible\"'}}, {'ProductId': '182'}]}
            return dbo.collection("Products").find(query).toArray(function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    getTags: function (query, callback) {
        console.log("entered getTags")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            // var key = query["category"] === "feature" ? "readable-value" : "value";
            // return dbo.collection("Tags").distinct(key, query, function (err, result) {
            //     if (err) throw err;
            //     return callback(result);
            // });
            return dbo.collection("Tags").find(query).toArray(function(err, result) {
                if (err) throw err;
                return callback(result);
            })
        });
    },

    checkUserExists: function (query, callback) {
        console.log("entered checkUserExists")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("Users").count(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    registerUser: function (query, callback) {
        console.log("entered registerUser");
        console.log(query);
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("Users").insert(query, function (err, result) {
                if (err) throw err;
                console.log("user insert")
            });
        });
    },

    loginUser: function (query, callback) {
        console.log("entered loginUser")
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            return dbo.collection("Users").count(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    }, 

    insertField: function (pid, url) {
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            dbo.collection('Products').updateOne(
                {ProductId: pid},
                {
                    $set: {'ImgurLink': url}
                }
            )
        });
    },

    insertTags: function (username, tags) {
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            dbo.collection('Users').updateOne(
                {username: username},
                {
                    $set: {'tags': tags}
                }
            )
        });
    },

    getDefaultTags: function (query, callback) {
        client.connect(function (err, db) {
            var dbo = db.db("AssistiveTechLib");
            dbo.collection('Users').findOne(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    }

}
module.exports = methods;