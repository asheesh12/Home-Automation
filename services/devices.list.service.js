const database = require('../config/database.config');
const Device = database.getModel('Device');
const UserService = require('./user.service');

exports.getPairedDevicesList = getPairedDevicesList; 

/**
 * Gets paired devices list
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} houseId 
 * @param {Object} options 
 */
function getPairedDevicesList(userId, houseId, options) {
    return UserService.getPairedDevicesForUser(userId, houseId, options);
}