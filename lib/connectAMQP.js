'use strict';

require('dotenv').config();

const amqplib = require('amqplib'); 

const connectionPromise = amqplib.connect(process.env.AMPQ);

module.exports = connectionPromise;
