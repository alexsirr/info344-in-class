"use strict";

const express = require("express");

module.exports = (mongoSession) => {
    if (!mongoSession) {
        throw new Error("provide Mongo Session");
    }

    let router = express.Router();
    
    router.post("/v1/tasks", (req, res) => {
        let task = {
            title: req.body.title,
            completed: false
        }
        return mongoSession.insert(task)
            
            .then(task => {
                res.json(task);
            })
            .catch(err => {
                throw err;
            });
    });
    
    router.get("/v1/tasks", (req, res) => {
        mongoSession.getAll(false)
            .then(tasks => {
                res.json(tasks);
            })
            .catch(err => {
                throw err;
            });
    });
    
    router.patch("/v1/tasks/:taskID", (req, res) => {
        let taskIDToFetch = req.params.taskId;
        mongoSession.update(taskIDToFetch, {completed: true})
            .then(task => {
                res.json(task);
            })
            .catch(err => {
                throw err;
            });
    });

    return router;
}