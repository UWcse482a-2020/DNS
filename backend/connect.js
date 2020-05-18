const { MongoClient } = require("mongodb");
const url = "mongodb+srv://482user:Hackccess20@cluster0-me5jz.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url);
resultArray = [];

// async function queryDb() {
//     try {
//         await client.connect(function(err, db) {
//             var dbo = db.db("AssistiveTechLib");
//             var query = { "Type": "Switch", "sound-off": "no"};
//             dbo.collection("Products").find(query).toArray(function(err, result) {
//                 if (err) throw err;
//                 console.log(result);
//                 resultArr.push(result);
//             });
//         });
//         return resultArr;
//         console.log("Connected correctly to server");

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// module.exports = queryDb;
// //run().catch(console.dir);

var methods = {
    queryDb: function (callback) {
        console.log("entered queryDb")
        client.connect(function (err, db) {
            console.log("inside client.connect")
            var dbo = db.db("AssistiveTechLib");
            var query = { "Type": "Switch" };
            return dbo.collection("Products").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log("result from connect.js: " + result)
                return callback(result);
                //client.close();
                //return resultArray;
            });
        });
        //console.log("out of client connect");
    }
}
module.exports = methods;