const config = require('../config/config');
const MQTTService = require('../services/mqtt.service');
const mqtt = require('async-mqtt');
const chalk = require('chalk');
const mqttClient  = mqtt.connect(config.mqttClient);
 
mqttClient.on("connect", onMQTTConnection);

module.exports = mqttClient;

/**
 * This function will run when connection to MQTT broker is established
 * @author Asheesh Bhuria
 */
function onMQTTConnection() {
  console.log(chalk.green("Connected to MQTT message broker"))
  mqttClient.on('feed/#', MQTTService.onLiveFeed)
}