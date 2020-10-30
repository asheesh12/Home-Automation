const database = require('../config/database.config');

const Schema =  database.Schema;

const DeviceSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: String, required: true, default: Date.now },
    product: { type: String, required:true },
    productType: { type: String, required:true },
    serialNumber: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    mqttTopic: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    houseId: { type: String, required: true }
})

DeviceSchema.statics.updateDevice = updateDevice;
DeviceSchema.statics.removeDevice = removeDevice;

const Device = database.addModel('Devices', DeviceSchema);

module.exports = Device;

/**
 * Updates device
 * @author Asheesh Bhuria
 * @param {String} deviceId 
 * @param {Object} deviceDetails 
 */
function updateDevice(deviceId, deviceDetails) {
    return Device.updateOne({ _id: deviceId }, { $set: deviceDetails });
}

/**
 * Remove device
 * @author Asheesh Bhuria
 * @param {String} deviceId 
 */
function removeDevice(deviceId) {
    return Device.deleteOne({ _id: deviceId });
}