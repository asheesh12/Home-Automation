'use strict';
 
const config = require('./config.js');
const chalk = require('chalk');
const mongoose = require('mongoose');
 
const connectionString = config.dbServer;

const connection = mongoose.createConnection(connectionString);
connection.on('error', function() {
    console.error(chalk.red('Mongo database connection error when connecting to ' + connectionString + '...'));
});
connection.once('open', function() {
    console.log(chalk.green('Mongo database connection opened for: ' + connectionString));
});
 
const dbConnection = connection.useDb('homeAutomation');

exports.addModel = addModel;
exports.getModel = getModel;
exports.Schema = mongoose.Schema;
exports.Type = mongoose.Types;

function addModel(schemaName, schema) {
    dbConnection.model(schemaName, schema);
}
 
function getModel(schemaName) {
    return dbConnection.model(schemaName);
}