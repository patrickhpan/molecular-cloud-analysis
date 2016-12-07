const regression = require('./lib/regression');
const poly_order = 2;
const min_sigma = 1;
const point_separation = 1;
const peak_min_points = 3;

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

function filter(data, minSigma = min_sigma) {
    let fit = fitted(data);
    let rmse = fittedRMSE(data);
    console.log(`rmse ${rmse}`);
    return data.map(point => {
        let predicted = fit(point[0]);
        let error = point[1] - predicted; // we only want positive errors
        if(error > minSigma * rmse) {
            return [...point, 1]
        } else {
            return [point[0], predicted, 0]
            // return null
        }

        // return point[1] > rms * minSigma ? point : null
    }).filter(x => x !== null)
}

function peakDetect(data) {
    // detect local maxima starting at high velocities
    // must have three significant points in a row for a "peak"

    let sorted = data
        .filter(x => x[2] === 1)
        .sort((a, b) => a[0] - b[0])
    let streak = 0;
    let peakPoints = [];
    let localMaximum = 0;
    let foundLocalMaximum = false;
    for (let i = sorted.length - 1; i >= 1; i--) {
        let point = sorted[i];
        let next = sorted[i - 1];
        if (Math.abs(next[0] - point[0]) < point_separation) {
            streak++;
            // console.log(`streak of ${streak}, current maximum ${localMaximum}, at point ${point[0]} ${point[1]} next ${next[0]} ${next[1]}`)
            peakPoints.push(point);          
            
            if (next[1] > point[1]) {
                if (!foundLocalMaximum) {
                    // console.log(`Still increasing, looking for local maximum`)
                    localMaximum = next[0];
                } else {
                    // console.log(`Decreased but local maximum already found`);
                }
            } else {
                if (!foundLocalMaximum) {
                    // console.log(`***Found local maximum!`)
                }
                foundLocalMaximum = true;
            }
        } else {
            if (streak >= peak_min_points) {
                return {
                    maximum: localMaximum,
                    peakPoints: peakPoints
                }
            } else {
                localMaximum = 0;
                streak = 0;
                foundLocalMaximum = false;
                peakPoints = [next];
            }
        }

    }

    return {
        maximum: 0,
        peakPoints: []
    }
}

module.exports = {
    fittedRMSE, filter, peakDetect
}