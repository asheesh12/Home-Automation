const mqttClient = require('../config/mqtt.config');
const RedisService = require('./redis.service');
const chalk = require('chalk');

exports.createMQTTTopicForUser = createMQTTTopicForUser;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.onLiveFeed = onLiveFeed;
exports.sendMessageToDevice = sendMessageToDevice; 

/**
 * Creates MQTT Topic from User id and house id
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} houseId 
 */
function createMQTTTopicForUser(userId, houseId) {
  return `feed/${userId}/${houseId}/#`;
}

/**
 * Subscribes to a MQTT topic
 * @author Asheesh Bhuria
 * @param {String} topic 
 */
function subscribe(topic) {
  mqttClient.subscribe(topic, (err) => {
    if (err) console(chalk.red(`Subscription to the following MQTT topic failed - ${topic}`));
  })
}

/**
 * Unsubscribes to a MQTT topic
 * @author Asheesh Bhuria
 * @param {String} topic 
 */
function unsubscribe(topic) {
  mqttClient.unsubscribe(topic, (err) => {
    if (err) console(chalk.red(`Failed to unsubscribe to the following MQTT topic - ${topic}`));
  })
}

/**
 * Forwards the live feed to user via WebSockets
 * @author Asheesh Bhuria
 * @param {String} topic 
 * @param {String} message 
 */
function onLiveFeed(topic, message) {
  let redisRoom = extractRoomForRedis(topic);
  if (!redisRoom) return console.log(chalk.red("Invalid room for Redis "));
  RedisService.publishMessage(redisRoom, message);
}

/**
 * Publishes message to the linked type using it's mqtt topic
 * @author Asheesh Bhuria
 * @param {String} deviceMQTTTopic 
 * @param {Object} data 
 */
function sendMessageToDevice(deviceMQTTTopic, data) {
  return mqttClient.publish(deviceMQTTTopic, data);
}

/**
 * Extracts user id from mqtt topic
 * @param {String} topic 
 */
function extractRoomForRedis(topic) {
  if (!topic) return '';
  let splitTopic = topic.split('/');
  if (splitTopic.length < 3) return;
  return splitTopic[1] +'/' + splitTopic[2];
}