"use strict";

const MongoStore = require("./taskstore.js");
const mongodb = require("mongodb");

const mongoAddr = process.env.DBADDR || "localhost:27017";
const mongoURL = `mongodb://${mongoAddr}/tasks`;

describe("Mongo Task Store", () => {
    test("CRUD Cycle", () => {
        return mongodb.MongoClient.connect(mongoURL)
            .then(db => {
                let store = new MongoStore(db, "tasks");
                let task = {
                    title: "learn node.js to mongodb",
                    tags: ["mongo", "node"]
                }
                return store.insert(task)
                    .then(task => {
                        expect(task._id).toBeDefined();
                        return task._id;
                    })
                    .then(taskId => {
                        return store.get(taskId)
                    })
                    .then(fetchedTask => {
                        expect(fetchedTask).toEqual(task);
                        return store.update(task._id, {completed: true});
                    })
                    .then(updateTask => {
                        expect(updateTask.completed).toBe(true);
                        return store.delete(task._id);
                    })
                    .then(() => {
                        return store.get(task._id)
                    })
                    .then(fetchedTask => {
                        expect(fetchedTask).toBeFalsy();
                    })
                    .then(() => {
                        db.close();
                    })
                    .catch(err => {
                        db.close();
                        throw err;
                    });
            });
    });
});