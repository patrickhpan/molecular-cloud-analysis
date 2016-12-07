const fs = require('fs');

// const preprocess = require('./js/preprocess');
// const { readLines, getData } = preprocess;

// // console.log(getData(readLines('data/Friday/galaxy_1.txt')))

// fs.writeFileSync('log', JSON.stringify(getData(readLines('data/Friday/galaxy_1.txt')), null, 2))

const readData = require('./js/readData');
const analyze = require('./js/analyze');

// fs.writeFileSync('log', JSON.stringify(readData("data/").map(entry => {
//     entry.data = analyze.filter(entry.data);
//     return entry;
// }), null, 2))

fs.writeFileSync('log', 
    readData('data/').map(entry => 
        `Longitude: ${entry.longitude}\n` + 
        analyze.filter(entry.data)
            .map(point => 
                `${point[0].toPrecision(4)}\t${point[1].toPrecision(4)}`
            ).join('\n')
    ).join('\n\n')
);