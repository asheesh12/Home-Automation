const DeviceCreateService = require('./devices.create.service');
const DeviceUpdateService = require('./devices.update.service');
const DeviceListService = require('./devices.list.service');

exports.addDevice = DeviceCreateService.addDevice;
exports.updateDevice = DeviceUpdateService.updateDevice;
exports.getPairedDevicesList = DeviceListService.getPairedDevicesList;