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

app.get("/api/catalogs", (req, res) => {
    db.collection("catalogs").find().toArray().then(catalogs => {
        res.json({catalogs: catalogs});
    }).catch(error => {
        console.log("API Server ERROR at /api/catalogs: ", error);
        res.status(500).json({message: `API Server ERROR: ${error}`});
    });
});

app.get("/api/configs", (req, res) => {
    db.collection("configs").find().limit(1).next().then(configs => {
        res.json({configs: configs});
    }).catch(error => {
        console.log("API Server ERROR at /api/configs: ", error);
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

//https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/
app.get("/api/catalog_groups", (req, res) => {
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

//https://docs.mongodb.com/manual/text-search/
app.get("/api/textsearch/:keyword", (req, res) => {
    const filter = {$text: {$search: req.params.keyword}};
    const sort = {score: {$meta: "textScore"}};
    const project = {
        score: {$meta: "textScore"},
        gallery: 0, keywords: 0, location: 0, _id: 0,
    };
    db.collection("items").find(filter)
        .project(project).sort(sort)
        .toArray().then(items => {
            res.json({items: items});
    }).catch(error => {
        console.log("API Server ERROR at /api/textsearch/:keyword: ", error);
        res.status(500).json({message: `API Server ERROR: ${error}`});
    });
});

app.get("/api/images", (req, res) => {
    let page = req.query.page || 1,
        perPage = req.query.perPage || 10;
    db.collection("items").aggregate([
        {$project: {gallery: 1, title: 1, _id: 0}},
        {$unwind: "$gallery"},
        {$project: {src: "$gallery.original", title: 1}},
        {$match: {src: {$exists: true}}},
        {$skip: parseInt((page - 1) * perPage)},
        {$limit: parseInt(perPage)},
    ]).toArray().then(images => {
        res.json({page: page, perPage: perPage, images: images});
    }).catch(error => {
        console.log("API Server ERROR at /api/images: ", error);
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
