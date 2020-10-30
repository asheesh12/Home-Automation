const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

exports.initialiseDatabase = initialiseDatabase;

function initialiseDatabase() {
    require('./config/database.config');
    let pathToModels = path.join(__dirname, './models');
    fs.readdir(pathToModels, (err, files) => {
        console.log(chalk.blue('Registering schemas....'))
        files.forEach(file => {
            let modelPath = path.join(pathToModels, file)
            require(modelPath)
            console.log(chalk.blue(`    ${file}`));
        });
    });
}

