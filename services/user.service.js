const database = require('../config/database.config');
const User = database.getModel('User');

exports.getPairedDevicesForUser = getPairedDevicesForUser; 

/**
 * Gets paired devices list and stats (the count of total documents)
 * @author Asheesh Bhuria
 * @param {String} userId the id of the user
 * @param {String} houseId the houseId 
 * @param {Object} options Options like sorting, fitlers, etc
 */
function getPairedDevicesForUser(userId, houseId, options) {
    return User.getPairedDevicesForUser(userId, houseId, options);
}