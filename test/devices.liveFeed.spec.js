// Commented by Asheesh Bhuria because this test case will always fail as we are not using stable MQTT broker

// const socketApp = require('../socket.js');
// const app = require('../app');
// const request = require('supertest');
// const mongoose = require('mongoose');
// const io = require('socket.io-client');
// const mqttClient = require('../config/mqtt.config');
// const redisSubClient = require('redis').createClient();

// describe('Socket Live Feed', function() {

//     let socket;

//     before(function(done) {
//         this.timeout(10000);
//         if (mqttClient.connected) connectToServerSocket();
//         else mqttClient.once('connect', connectToServerSocket);

//         function connectToServerSocket() {
//             socket = io.connect('http://localhost:80', {
//                 'query': { 'userId': '5f9c591792eb3f3fcb89131e', 'houseId': 'house1' },
//                 'reconnection delay' : 0,
//                 'reopen delay' : 0,
//                 'force new connection' : true
//             });
//             socket.once('connect', function() {
//                 done();
//             });
//         }
//     });
    
//     // TODO - Update this based on redis sub client
//     it('receive live feed', function(done) {
//         socket.emit('subscribe')
//         redisSubClient.subscribe('5f9c591792eb3f3fcb89131e/house1');
//         redisSubClient.on('5f9c591792eb3f3fcb89131e/house1', (channel, message) => done())
//     }).timeout(200000);

// });

