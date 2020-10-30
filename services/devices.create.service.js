const database = require('../config/database.config');
const Device = require('../models/devices.model');

exports.addDevice = addDevice; 

/**
 * Inserts a device in the document
 * @author Asheesh Bhuria
 * @param {Object} requestBody 
 */
function addDevice(requestBody) {
    let deviceDetails = extractDeviceDetails(requestBody);
    let device = new Device(deviceDetails);
    return device.save();
}

/**
 * Extracts all the relevant device details from the request
 * @author Asheesh Bhuria
 * @param {Object} param0 Device details  
 */
function extractDeviceDetails({ name, product, serialNumber, company, mqttTopic, user, houseIds }) {
    return { name, product, serialNumber, company, mqttTopic, user, houseIds };
}