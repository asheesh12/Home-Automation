const MQTTService = require('./mqtt.service');

exports.communicateToDevice = communicateToDevice; 

/**
 * Gets paired devices list
 * @author Asheesh Bhuria
 * @param {String} device 
 * @param {Object} options 
 */
function communicateToDevice(instructions) {
    return function(mqttTopic) {
        return MQTTService.sendMessageToDevice(mqttTopic, instructions);
    }
}