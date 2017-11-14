#!/usr/bin/env node
"use strict";

const amqp = require("amqplib")

const qName = "testQ";
const mqAddr = process.env.MQADDR || "localhost:5672";
const mqURL = `amqp://${mqAddr}`;

(async function() {
    try {
        console.log("connecting to %s", mqURL);
        // wait until async is done
        let connection = await amqp.connect(mqURL);
        let channel = await connection.createChannel();
        // durable false makes messages disappear if server dies
        let qConf = await channel.assertQueue(qName, {durable: false});
    
        setInterval(() => {
            let msg = {
                msg: "hello there",
                time: new Date().toLocaleString()
            }
            channel.sendToQueue(qName, new Buffer(JSON.stringify(msg)));
        }, 1000);
    } catch(e) {
        console.error(e.stack)
    }
    
})();