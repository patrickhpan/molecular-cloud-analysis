const regression = require('./lib/regression');
const poly_order = 2;

function fitted(data) {
    let coefficients = regression('polynomial', data, poly_order).equation;
    return ( x => coefficients.map((c, pow) => c * Math.pow(x, pow)).reduce((sum, next) => sum + next, 0)
    ) ;
}

function fittedRMSE(data) {
    let fit = fitted(data);
    let errors = data.map(point => Math.abs(point[1] - fit(point[0])));
    let sumSquaredErrors = errors
        .map(x => Math.pow(x, 2))
        .reduce((sum, next) => sum + next, 0);
    let rmse = Math.sqrt(sumSquaredErrors / data.length)
    return rmse;
}

function filter(data, minSigma = 1) {
    let fit = fitted(data);
    let rmse = fittedRMSE(data);
    console.log(`rmse ${rmse}`);
    return data.map(point => {
        let predicted = fit(point[0]);
        let error = point[1] - predicted; // we only want positive errors
        if(error > minSigma * rmse) {
            return point
        } else {
            return [point[0], predicted]
            // return null
        }

        // return point[1] > rms * minSigma ? point : null
    }).filter(x => x !== null)
}

module.exports = {
    fittedRMSE, filter
}