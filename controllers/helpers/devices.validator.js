const { param, body } = require('express-validator');

exports.pairedDeviceValidators = pairedDeviceValidators;
exports.addDeviceValidators = addDeviceValidators;
exports.updateDeviceValidators = updateDeviceValidators;
exports.removeDeviceValidators = removeDeviceValidators;
exports.communicateDeviceValidators = communicateDeviceValidators;

/**
 * Gets validators for fetching the list of paired devices
 * @author Asheesh Bhuria
 */
function pairedDeviceValidators() {
    return [
        param('houseId')
            .notEmpty()
    ];
}

/**
 * Gets validators adding a device
 * @author Asheesh Bhuria
 */
function addDeviceValidators() {
    return [
        body('name')
            .exists()
            .isString()
            .notEmpty(),
        body('product')
            .exists()
            .isString()
            .notEmpty(),
        body('serialNumber')
            .exists()
            .isString()
            .notEmpty(),
        body('company')
            .exists()
            .isString()
            .notEmpty(),
        body('mqttTopic')
            .exists()
            .isString()
            .notEmpty(),
        body('user')
            .exists()
            .isString()
            .notEmpty(),
        body('houseId')
            .exists()
            .isString()
            .notEmpty()
    ];
}

/**
 * Gets validators for removing a device
 * @author Asheesh Bhuria
 */
function removeDeviceValidators() {
    return [
        param('deviceId')
            .exists()
            .isString()
            .notEmpty()
    ];
}

/**
 * Gets validators for adding a device
 * @author Asheesh Bhuria
 */
function updateDeviceValidators() {
    return [
        param('deviceId')
            .exists()
            .isString()
            .notEmpty()
    ];
}

/**
 * Gets validators for adding a device
 * @author Asheesh Bhuria
 */
function communicateDeviceValidators() {
    return [
        param('deviceId')
            .exists()
            .isString()
            .notEmpty()
    ];
}