#!/usr/bin/env node
require('dotenv').config();

var util = require('util');
var amqp = require('amqplib/callback_api');

var amql_url=
    util.format('amqps://%s:%s@%s:%s',
    process.env.BROKER_USER,
    process.env.BROKER_PASS, 
    process.env.BROKER_URL,
    process.env.BROKER_PORT);

function receive(req) {
    const io = req.app.get('io');
    amqp.connect(amql_url, function(error0, connection) {
        
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            let queue = 'pagosQueue';
            
            channel.assertQueue(queue, {
            durable: false
            });

            console.log(" [*] Waiting for messages in %s.", queue);
            channel.consume(queue, function(msg) {
                
                console.log(" [x] Received %s", msg.content.toString());
                io.emit('sendPayment', msg.content.toString());
                

            }, {
            noAck: true
            });

        });
    })
}

function send(msg) { 
    amqp.connect(amql_url, function(error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          let queue = 'pagosQueue';
          //let msg = 'mensaje de prueba';
      
          channel.assertQueue(queue, {
            durable: false
          });
      
          channel.sendToQueue(queue, Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
          });
      
          setTimeout(function() { 
              connection.close(); 
              }, 500);
      
      });
}

module.exports = { receive,send }