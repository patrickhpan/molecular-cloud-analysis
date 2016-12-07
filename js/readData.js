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
    data = data
        .map(entry => {
            return {
                latitude: Number(entry.metadata.lii.toPrecision(4)),
                metadata: entry.metadata,
                data: entry.data
            }
        })
        .sort((a, b) => a.latitude - b.latitude)

    return data;
}

module.exports = readData;

