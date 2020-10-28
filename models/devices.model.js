const database = require('../config/database');

const Schema =  database.Schema;

const DeviceSchema = new Schema({
    name: { type: String, required: true },
    product: { type: String, required:true },
    serialNumber: { type: String, required: true },
    company: { type: String, required: true },
    mqttTopic: { type: String, required: true },
    user: { type: ObjectId, required: true },
    houseIds: { type: String, required: true }
})

const Device = database.addModel('Devices', DeviceSchema);