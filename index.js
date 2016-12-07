const fs = require('fs');
const readData = require('./js/readData');
const analyze = require('./js/analyze');

let longitudePeaks = []

readData('data/').forEach(entry => {
    let { longitude, data } = entry;
    let filteredData = analyze.filter(data);
    let csvRows = filteredData
        .map(point => 
            `${point[0].toPrecision(4)},${point[1].toPrecision(4)}`
        ).join('\n')
    csvRows = 'Velocity,Signal\n' + csvRows;

    let peak = analyze.peakDetect(filteredData);
    
    longitudePeaks.push({
        longitude: longitude,
        peak: peak
    })
    
    fs.writeFileSync(`out/longitude-${longitude}-${peak.maximum}.csv`, csvRows)
})

longitudePeaks = longitudePeaks.filter(entry => {
    return entry.peak.maximum > 0 && entry.peak.peakPoints.length > 0
})

fs.writeFile('output.csv', 'Longitude,Velocity,Error\n' + longitudePeaks.map(entry => {
    let { longitude, peak } = entry;
    let { maximum, peakPoints } = peak;
    let error = (2 *  Math.abs(maximum - peakPoints[0][0])).toPrecision(4);
    return `${longitude},${maximum},${error}`
}).join('\n'))