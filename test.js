const fs = require('fs');

// const preprocess = require('./js/preprocess');
// const { readLines, getData } = preprocess;

// // console.log(getData(readLines('data/Friday/galaxy_1.txt')))

// fs.writeFileSync('log', JSON.stringify(getData(readLines('data/Friday/galaxy_1.txt')), null, 2))

const readData = require('./js/readData');

fs.writeFileSync('log', JSON.stringify(readData("data/"), null, 2))