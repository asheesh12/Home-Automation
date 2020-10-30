const DeviceCreateService = require('./devices.create.service');
const DeviceUpdateService = require('./devices.update.service');
const DeviceListService = require('./devices.list.service');
const DeviceCommunicationService = require('./devices.communication.service.js');

exports.addDevice = DeviceCreateService.addDevice;
exports.updateDevice = DeviceUpdateService.updateDevice;
exports.getPairedDevicesList = DeviceListService.getPairedDevicesList;
exports.communicateToDevice = DeviceCommunicationService.communicateToDevice;