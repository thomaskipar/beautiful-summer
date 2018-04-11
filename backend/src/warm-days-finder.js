let LineByLineReader = require('line-by-line');
let moment = require('moment');
let parser = require('./data-parser');

function findLongestWarmPeriod(data, year) {

    let startDate = moment(`${year}-01-01`);
    let endDate = moment(`${year}-12-31`);

    let date = moment(startDate);

    let isSummerPeriod = false;

    let currentSummerDate;
    let minSummerTemperature = 28;
    let numSummerDays = 0;

    let maxSummerDate;
    let maxSummerDays = 0;

    while (date.isBefore(endDate)) {
        let temperature = data[date.format("YYYYMMDD")];
        if (temperature >= minSummerTemperature) {
            if (currentSummerDate) {
                numSummerDays++;
            } else {
                currentSummerDate = moment(date);
                numSummerDays = 1;
            }
        } else if (currentSummerDate) {
            if (maxSummerDays < numSummerDays) {
                maxSummerDate = currentSummerDate;
                maxSummerDays = numSummerDays;
            }
            currentSummerDate = undefined;
        }
        date = date.add(1, 'days');
    }

    if (maxSummerDate) {
        return {
            date: maxSummerDate.format("YYYYMMDD"),
            days: maxSummerDays
        }
    } else {
        return {
            days: 0
        };
    }
}

module.exports = findLongestWarmPeriod


