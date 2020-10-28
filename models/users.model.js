const database = require('../config/database');

const Schema =  database.Schema;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String, required: true, unique: true }, // emailAddress is used as an index
    password: { type: String, required: true },
    roles: { type: [String], required: true },
    devices: [{ type: Schema.Types.ObjectId, ref: 'Devices', default: undefined }],
    locationIds: { type: [String] }
})

User.statics.findByEmailAddress = findByEmailAddress;

const User = database.addModel('Users', UserSchema);

function findByEmailAddress(emailAddress) {
    return User.findOne({ emailAddress });
}