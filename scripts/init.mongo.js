// node scripts/init.mongo.js
// https://mongodb.github.io/node-mongodb-native/3.0/api/index.html

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbname = "qinghai_heritage";

const path = require("path");
const glob = require("glob");
const fs = require("fs");

let items_pattern = path.join(__dirname, "..", "json_db", "*", "*.json");
let items;
glob(items_pattern, (error, files) => {
    if (error) {
        console.log("ERROR: ", error);
        process.exit(-1);
    }
    items = files.map(filepath => {
        let rawjson = fs.readFileSync(filepath);
        console.log("Reading DB-item: " + filepath);
        let item = JSON.parse(rawjson);
        return item;
    });
});

let catalogs_jsonpath = path.join(__dirname, "..", "json_db", "catalogs.json");
let catalogs = JSON.parse(fs.readFileSync(catalogs_jsonpath));
console.log("Read DB-catalogs: " + catalogs_jsonpath);

let configs_jsonpath = path.join(__dirname, "..", "json_db", "configs.json");
let configs = JSON.parse(fs.readFileSync(configs_jsonpath));
console.log("Read DB-configs: " + configs_jsonpath);


let client, db, coll_items, coll_catalogs, coll_configs;

function init_items_collection() {
    console.log("Start init item collection");
    return coll_items.remove({}).then(result => {
        console.log("\tClean: ", result.result);
        return coll_items.insert(items);
    }).then(result => {
        console.log("\tInsert: ", result.result);
        return coll_items.dropIndexes();
    }).then(result => {
        console.log("\tDrop indexes: ", result);
        return coll_items.createIndex("title");
    }).then(result => {
        console.log("\tCreate title indexes: ", result);
        return coll_items.createIndex({
            title: "text", "category": "text", keywords: "text"});
    }).then(result => {
        console.log("\tCreate text indexes: ", result);
        return {result: "Successful init item collection"};
    }).catch(error => {
        console.log("ERROR: ", error);
    });
}

function init_catalogs_collection() {
    console.log("Start init catalogs collection");
    return coll_catalogs.remove({}).then(result => {
        console.log("\tClean: ", result.result);
        return coll_catalogs.insert(catalogs);
    }).then(result => {
        console.log("\tInsert: ", result.result);
        return {result: "Successful init catalogs collection"};
    }).catch(error => {
        console.log("ERROR: ", error);
    });
}

function init_configs_collection() {
    console.log("Start init configs collection");
    return coll_configs.remove({}).then(result => {
        console.log("\tClean: ", result.result);
        return coll_configs.insert(configs);
    }).then(result => {
        console.log("\tInsert: ", result.result);
        return {result: "Successful init configs collection"};
    }).catch(error => {
        console.log("ERROR: ", error);
    });
}

MongoClient.connect(url, {useNewUrlParser: true}).then(conn => {
    client = conn;
    db = client.db(dbname);
    coll_items = db.collection("items");
    coll_catalogs = db.collection("catalogs");
    coll_configs = db.collection("configs");
    return init_items_collection();
}).then(result => {
    console.log(result.result);
    return init_catalogs_collection();
}).then(result => {
    console.log(result.result);
    return init_configs_collection();
}).then(result => {
    console.log(result.result);
    client.close();
}).catch(error => {
    console.log("ERROR: ", error);
});
