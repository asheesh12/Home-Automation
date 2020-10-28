const database = require('../config/database.config');

const Device = database.getModel('Device');
const User = database.getModel('User');
const DeviceService = require('../services/devices.services.js');
const ResponseHelper = require('../services/response.helper');

exports.getPairedDevices = getPairedDevices;
exports.addDevice = addDevice;
exports.removeDevice = removeDevice;
exports.updateDevice = updateDevice;

/**
 * Gets all the paired devices for a User based on his house number
 * @author Asheesh Bhuria
 */
function getPairedDevices(request, response, next) {
    let sendResponse = ResponseHelper.createResponseHandler(response);
    let handleError = ResponseHelper.createErrorHandler(response);

    let userId = request.loggedInUserDetails || request.loggedInUserDetails.userId;
    let houseIds =request.params.houseIds;
    
    // TODO - Add pagination
    return DeviceService.getPairedDevicesAndStats(userId, houseIds)
        .then(createResponse)
        .then(sendResponse)
        .catch(handleError);
}

/**
 * Adds a device for a specific user
 * @author Asheesh Bhuria
 */
function addDevice(request, response, next) {
    let sendResponse = ResponseHelper.createResponseHandler(response);
    let handleError = ResponseHelper.createErrorHandler(response);

    return DeviceService.addDevice(request.body)
        .then(createResponse)
        .then(sendResponse)
        .catch(handleError);
}

/**
 * Removes a device for from Device as well as User records
 * @author Asheesh Bhuria
 */
function removeDevice(request, response, next) {
    let sendResponse = ResponseHelper.createResponseHandler(response);
    let handleError = ResponseHelper.createErrorHandler(response);

    let deviceId =request.params.deviceId;
    return Device.removeDevice(deviceId)
        .then(User.removeDeviceFromList(deviceId))
        .then(createResponse)
        .then(sendResponse)
        .catch(handleError);
}

/**
 * Updates a device
 * @author Asheesh Bhuria
 */
function updateDevice(request, response, next) {
    let sendResponse = ResponseHelper.createResponseHandler(response);
    let handleError = ResponseHelper.createErrorHandler(response);

    let deviceId =request.params.deviceId;
    return Device.updateDevice(deviceId, request.body)
        .then(createResponse)
        .then(sendResponse)
        .catch(handleError);
}