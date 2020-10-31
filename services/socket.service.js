const mqttService = require('./mqtt.service');

exports.onSocketSubscribeEvent = onSocketSubscribeEvent; 
exports.onSocketUnsubscribeEvent = onSocketUnsubscribeEvent; 

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
    }
}