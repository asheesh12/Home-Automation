const database = require('../config/database.config');
const { DEVICE_SORT } = require('../config/constants.config');

const Schema =  database.Schema;
const Type = database.Type;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String, required: true, unique: true }, // emailAddress is used as an index
    password: { type: String, required: true },
    roles: { type: [String], required: true },
    devices: [{ type: Schema.Types.ObjectId, ref: 'Devices', default: undefined }],
    locationIds: { type: [String] }
})

UserSchema.statics.findByEmailAddress = findByEmailAddress;
UserSchema.statics.getPairedDevicesForUser = getPairedDevicesForUser;
UserSchema.statics.addDeviceToList = addDeviceToList;
UserSchema.statics.removeDeviceFromList = removeDeviceFromList;

const User = database.addModel('Users', UserSchema);

/**
 * Finds a user record based on his email address
 * @author Asheesh Bhuria
 * @param {String} emailAddress 
 */
function findByEmailAddress(emailAddress) {
    return User.findOne({ emailAddress });
}

/**
 * Gets paired devices linked to a user
 * @author Asheesh Bhuria
 * @param {String} userId 
 * @param {String} houseId 
 * @param {Object} options 
 */
function getPairedDevicesForUser(userId, houseId, options) {
    return User.aggregate([
        getAggregationQueryToMatchUser(userId),
        getAggregationQueryToPopulateDevices(),
        getAggregationQueryToUnwindDevices(),
        getAggregationQueryToReplaceRootAsDevice(),
        getAggregationQueryToFilterDevice(houseId),
        getAggregationQueryToSort(options)
    ]);
}

/**
 * Adds paired device for the linked user
 * @author Asheesh Bhuria
 * @param {String} userId 
 */
function addDeviceToList(userId) {
    return function(deviceDetails) {
        return User.findOneAndUpdate({_id: userId}, { $push: { 'devices': deviceDetails._id } });
    }
}

/**
 * Removes paired device for the linked user
 * @author Asheesh Bhuria
 * @param {String} userId 
 */
function removeDeviceFromList(userId, deviceId) {
    return function() {
        return User.findOneAndUpdate({_id: userId}, { $pull: { 'devices': deviceId } });
    }
}

function getAggregationQueryToMatchUser(userId) {
    return {  
        "$match": Type.ObjectId(userId)
    }
}

function getAggregationQueryToPopulateDevices() {
    return { 
        "$lookup": {
            "from": "devices",
            "foreignField": "_id",
            "localField": "devices",
            "as": "devices"
        }
    };
}

function getAggregationQueryToUnwindDevices() {
    return {
        "$unwind": "$devices"
    };
}

function getAggregationQueryToReplaceRootAsDevice() {
    return {
        "$replaceRoot": {
            "newRoot": "$devices"
        }
    }
}

function getAggregationQueryToFilterDevice(houseId) {
    return {
        "$match": {
            houseId: houseId
        }
    };
}

function getAggregationQueryToSort(options) {
    return {
        "$sort": getSortForDeviceSort(options)
    };
}

function getSortForDeviceSort(options) {
    let order = options.order == 'asc' ? 1 : -1;
    switch (options.sort) {
        case DEVICE_SORT.PRODUCT_TYPE:
            return { 'productType': order };
        case DEVICE_SORT.NAME:
            return { 'name': order };
        case DEVICE_SORT.PRODUCT_TYPE:
            return { 'company': order };
        case DEVICE_SORT.DATE:
            return { 'date': order };
        default:
            return { 'productType': order };
    }
}