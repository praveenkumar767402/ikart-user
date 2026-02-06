const fs = require('fs');
const util = require('util');

try {
    const logFile = fs.createWriteStream('model_error.log', { flags: 'w' });
    const logStdout = process.stdout;
    const logStderr = process.stderr;

    console.log = function (d) { //
        logFile.write(util.format(d) + '\n');
        logStdout.write(util.format(d) + '\n');
    };
    console.error = function (d) { //
        logFile.write(util.format(d) + '\n');
        logStderr.write(util.format(d) + '\n');
    };

    console.log('Testing models/index.js...');
    const models = require('./src/models');
    console.log('Models loaded successfully:', Object.keys(models));
} catch (error) {
    console.error('CRITICAL ERROR LOADING MODELS:');
    console.error(error); // This will log the error object structure
    if (error.stack) console.error(error.stack);
}
