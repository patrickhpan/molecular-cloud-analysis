const glob = require('glob');
const process = require('process');
const preprocess = require('./preprocess');

const pattern = "**/*.txt";

function readData(cwd = process.cwd()) {
    let files = glob.sync(pattern, { 
        cwd: cwd,
        absolute: true 
    });

    let data = files.map(preprocess.getData);
    data = data.sort((a, b) => a.longitude - b.longitude)

    return data;
}

module.exports = readData;