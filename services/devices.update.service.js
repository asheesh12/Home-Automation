const Device = require('../models/devices.model');

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