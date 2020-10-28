const express = require('express');
const router = express.Router();

router.get('/available/:locationId', pairedDeviceValidators, validateRequest,  DeviceController.getDevices);
router.post('/', addDeviceValidators, validateRequest, DeviceController.addDevice);
router.put('/:deviceId', updateDeviceValidators, validateRequest, DeviceController.updateDevice);
router.delete('/deviceId',removeDeviceValidators, validateRequest, DeviceController.updateDevice);

module.exports = router;