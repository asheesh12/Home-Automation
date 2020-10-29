const database = require('../config/database.config');
const { updateDevice } = require('../controllers/devices.controller');
const Device = database.getModel('Device');

exports.updateDevice = updateDevice; 

function updateDevice(deviceId, deviceDetails) {
    return Device.updateDevice(deviceId, deviceDetails);
}

function enableDevice(deviceId) {
    return Device.enableDevice(deviceId);
}

function disableDevice(deviceId) {
    return Device.disableDevice(deviceId);
}