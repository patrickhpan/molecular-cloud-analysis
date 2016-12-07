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

readData('data/').forEach(entry => {
    let { longitude, data } = entry;
    let csvRows = analyze.filter(data)
        .map(point => 
            `${point[0].toPrecision(4)},${point[1].toPrecision(4)}`
        ).join('\n')
    csvRows = 'Velocity,Signal\n' + csvRows;

    fs.writeFileSync(`out/longitude-${longitude}.csv`, csvRows)
})