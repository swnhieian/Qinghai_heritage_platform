// node scripts/init.mongo.js
// https://mongodb.github.io/node-mongodb-native/3.0/api/index.html

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbname = "qinghai_heritage";

const path = require("path");
const glob = require("glob");
const fs = require("fs");

let pattern = path.join(__dirname, "..", "json_db", "*", "*.json");
let items;
glob(pattern, (error, files) => {
    if (error) {
        console.log("ERROR: ", error);
        process.exit(-1);
    }
    items = files.map(filepath => {
        let rawjson = fs.readFileSync(filepath);
        let item = JSON.parse(rawjson);
        console.log(filepath);
        return item;
    });
});

let client, db, collection;
MongoClient.connect(url, {useNewUrlParser: true}).then(conn => {
    client = conn;
    db = client.db(dbname);
    collection = db.collection("items");
    return collection.remove({});
}).then(result => {
    console.log("Result of remove: ", result.result);
    return collection.insert(items);
}).then(result => {
    console.log("Result of insert: ", result.result);
    client.close();
}).catch(error => {
    console.log("ERROR: ", error);
});
