const sockets = require('./sockets');
const mqttService = require('./mqtt.service');

exports.onSocketSubscribeEvent = onSocketSubscribeEvent; 
exports.onSocketUnsubscribeEvent = onSocketUnsubscribeEvent; 
exports.onSocketDisconnectedEvent = onSocketDisconnectedEvent; 
exports.sendMessage = sendMessage;

/**
 * Callback for 'subscribe' event (via websocket protocol).
 * This event will be used when a client is ready to accept live feed from 
 * IOT devices.
 * @author Asheesh Bhuria
 * @param {Object} socket - Socket object 
 */
function onSocketSubscribeEvent(socket) {
    return function() {
        let userId = socket.handshake.query.userId;
        let houseId = socket.handshake.query.houseId;
        let topic = mqttService.createMQTTTopicForUser(userId, houseId);
        mqttService.subscribe(topic);
        sockets.addSocket(userId, socket);
    }
}

/**
 * Callback for 'unsubscribe' event (via websocket protocol)
 * This event will be used when a client wants to stop receiving live feed 
 * from IOT devices.
 * @author Asheesh Bhuria
 * @param {Object} socket - Socket object 
 */
function onSocketUnsubscribeEvent(socket) {
    return function() {
        let userId = socket.handshake.query.userId;
        let houseId = socket.handshake.query.houseId;
        let topic = mqttService.createMQTTTopicForUser(userId, houseId);
        mqttService.unsubscribe(topic);
        sockets.removeSocket(userId);
    }
}

/**
 * Callback for 'disconnect' event (via websocket protocol)
 * @author Asheesh Bhuria
 * @param {Object} socket - Socket object 
 */
function onSocketDisconnectedEvent(socket) {
    return function() {
        let userId = socket.handshake.query.userId;
        sockets.removeSocket(userId);
    }
}

/**
 * Sends message to the client via websockets
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} liveFeed 
 * @param {String} message 
 */
function sendMessage(userId, liveFeed, message) {
    return sockets.sendMessage(userId, liveFeed, message);
}