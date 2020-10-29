const database = require('../config/database.config');
const Device = database.getModel('Device');

exports.getPairedDevicesListAndStats = getPairedDevicesListAndStats; 

/**
 * Gets paired devices list and stats (the count of total documents)
 * @author Asheesh Bhuria
 * @param {String} userId the id of the user
 * @param {String} houseId the houseId 
 * @param {Object} options Options like sorting, fitlers, etc
 */
function getPairedDevicesListAndStats(userId, houseId, options) {
    return Promise.all([
        getPairedDevicesList(userId, houseId, options),
        getPairedDevicesStats(userId, houseId, options)
    ])
}

/**
 * Gets paired devices list
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} houseId 
 * @param {Object} options 
 */
function getPairedDevicesList(userId, houseId, options) {
    return Device.getPairedDevices(userId, houseId, options);
}

/**
 * Gets paired devices stats like their count
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} houseId 
 * @param {Object} options 
 */
function getPairedDevicesStats(userId, houseId, options) {
    return Device.getPairedDeviceCount(userId, houseId, options);
}