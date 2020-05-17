const { MongoClient } = require("mongodb");
const url = "mongodb+srv://482user:Hackccess20@cluster0-me5jz.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect(function(err, db) {
            var dbo = db.db("AssistiveTechLib");
            var query = { "Type": "Switch", "sound-off": "no"};
            dbo.collection("Products").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
            });
        });
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);