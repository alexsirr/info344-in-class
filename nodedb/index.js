"use strict";

const mongodb = require("mongodb");
const MongoStore = require("./taskstore")
const express = require("express");

const handlers = require("./handlers.js");

const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");

const mongoAddr = process.env.DBADDR || "localhost:27017";
const mongoURL = `mongodb://${mongoAddr}/tasks`;

mongodb.MongoClient.connect(mongoURL)
    .then(db => {
        let taskStore = new MongoStore(db, "tasks");
        app.use(express.json());
        app.use(handlers(taskStore));
    }).catch(err => {
        throw err;
    });

app.listen(port, host, () => {
    console.log(`server is listening at http://${addr}...`);
});