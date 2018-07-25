const express = require('express');
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbname = "qinghai_heritage";

const app = express();

app.get("/api/items", (req, res) => {
    db.collection("items").find().toArray().then(items => {
        res.json({items: items});
    }).catch(error => {
        console.log("API Server ERROR at /api/items: ", error);
        res.status(500).json({message: `API Server ERROR: ${error}`});
    });
});

app.get("/api/items/:title", (req, res) => {
    const filter = {title: req.params.title};
    db.collection("items").find(filter).limit(1).next().then(item => {
        res.json({item: item});
    }).catch(error => {
        console.log("API Server ERROR at /api/items/:title: ", error);
        res.status(500).json({message: `API Server ERROR: ${error}`});
    });
});

app.get("/api/catalog", (req, res) => {
    db.collection("items").aggregate([
        {"$project": {category: 1,
                      info: {id: "$title", name: "$title", thumbnail: "$thumbnail"}}},
        {"$group": {_id: "$category", id: {$first: "$category"},
                    name: {$first: "$category"}, children: {$push: "$info"}}}
    ]).toArray().then(categories => {
        res.json({categories: categories});
    }).catch(error => {
        console.log("API Server ERROR at /api/items/:title: ", error);
        res.status(500).json({message: `API Server ERROR: ${error}`});
    });
});

let client, db;
MongoClient.connect(url, {useNewUrlParser: true}).then(conn => {
    client = conn;
    db = client.db(dbname);
    app.listen(3001, () => {
        console.log("API Server started on port 3001");
    });
}).catch(error => {
    console.log("API Server ERROR: ", error);
});
