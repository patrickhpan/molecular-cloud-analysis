const fs = require('fs');

function readLines(filename) {
    let contents = fs.readFileSync(filename, 'utf8');

    let lines = contents
        .split(/[\n\r]+/)
        .filter(line => line !== '')
        .map(line => line
            .replace(/^\s+/,'')
            .replace(/\s+$/,'')
        );

    return lines;
}

function getData(filename) {
    let lines = readLines(filename);
    
    let metadata = {};
    let data = [];

    let kvMatcher = line => line.match(/^([^:]+): (.+)$/);
    let coordMatcher = line => line.match(/^\s*([-\.\d]+)\s*([-\.\d]+)\s*$/)

    lines.forEach(line => {
        let kvMatch = kvMatcher(line);
        let coordMatch = coordMatcher(line);
        if(kvMatch) {
            let key = kvMatch[1];
            let value = kvMatch[2];
            if(!isNaN(value)) {
                value = Number(value);
            }

            let kv = { 
                [key]: value
            }

            Object.assign(metadata, kv)
        } else if (coordMatch) {
            let x = Number(coordMatch[1]);
            let y = Number(coordMatch[2]);
            data = [...data, [x, y]];
        }
    })

    return { 
        metadata,
        data
    };
}

module.exports = {
    readLines,
    getData
}