const database = require('../config/database.config');

const Device = require('../models/devices.model');
const User = require('../models/users.model');
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

    let userId = request.loggedInUserDetails && request.loggedInUserDetails.userId;
    let houseIds = request.params.houseId;
    return DeviceService.getPairedDevicesList(userId, houseIds)
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
    let addDeviceDetailsForUser = User.addDeviceToList(request.loggedInUserDetails.userId);

    return DeviceService.addDevice(request.body)
        .then(addDeviceDetailsForUser)
        .then(createResponse('Device added successfuly'))
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
    let userId = request.loggedInUserDetails.userId;
    return Device.removeDevice(deviceId)
        .then(User.removeDeviceFromList(userId, deviceId))
        .then(createResponse('Device removed successfuly'))
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
    return DeviceService.updateDevice(deviceId, request.body)
        .then(createResponse('Device updated successfuly'))
        .then(sendResponse)
        .catch(handleError);
}

function createResponse(message) {
    return function() {
        return {
            error: false,
            message
        };
    }
}