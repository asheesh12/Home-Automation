const redisPubClient = require('../config/redis.config');
const { isString } = require('util');

exports.publishMessage = publishMessage; 

/**
 * Publishes message to a Redis Room
 * @author Asheesh Bhuria
 * @param {String} room 
 * @param {*} message 
 */
function publishMessage(room, message) {
    if (!isString(message)) message = JSON.stringify(message);
    redisPubClient.publish(room, message);
}