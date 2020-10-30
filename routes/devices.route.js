const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/devices.controller');
const { pairedDeviceValidators, addDeviceValidators, updateDeviceValidators, removeDeviceValidators } = require('../controllers/helpers/devices.validator');
const { validateRequest } = require('../services/validator');

router.get('/available/:houseIds', pairedDeviceValidators, validateRequest,  DeviceController.getPairedDevices);
router.post('/', addDeviceValidators, validateRequest, DeviceController.addDevice);
router.put('/:deviceId', updateDeviceValidators, validateRequest, DeviceController.updateDevice);
router.delete('/deviceId',removeDeviceValidators, validateRequest, DeviceController.removeDevice);

module.exports = router;