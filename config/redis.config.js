const redis = require('redis')
// TODO - Configure authentication and other options
const redisPubClient = redis.createClient()

module.exports = redisPubClient;