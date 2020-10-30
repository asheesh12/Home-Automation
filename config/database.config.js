'use strict';
 
const config = require('./config.js');
const chalk = require('chalk');
const mongoose = require('mongoose');
 
const connectionString = config.dbServer;

const connection = mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

connection.on('error', function() {
    console.error(chalk.red('Mongo database connection error when connecting to ' + connectionString + '...'));
});
connection.once('open', function() {
    console.log(chalk.green('Mongo database connection opened for: ' + connectionString));
});

exports.addModel = addModel;
exports.Schema = mongoose.Schema;
exports.Type = mongoose.Types;

function addModel(schemaName, schema) {
    return connection.model(schemaName, schema);
}