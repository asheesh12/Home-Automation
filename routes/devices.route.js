const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/devices.controller');
const { decodeUserToken } = require('../services/authentication');
const { pairedDeviceValidators, addDeviceValidators, updateDeviceValidators, removeDeviceValidators } = require('../controllers/helpers/devices.validator');
const { validateRequest } = require('../services/validator');

router.get('/available/:houseId', decodeUserToken, pairedDeviceValidators(), validateRequest,  DeviceController.getPairedDevices);
router.post('/', decodeUserToken, addDeviceValidators(), validateRequest, DeviceController.addDevice);
router.put('/:deviceId', decodeUserToken, updateDeviceValidators(), validateRequest, DeviceController.updateDevice);
router.delete('/deviceId', decodeUserToken,removeDeviceValidators(), validateRequest, DeviceController.removeDevice);

module.exports = router;