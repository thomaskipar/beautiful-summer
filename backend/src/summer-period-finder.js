let LineByLineReader = require('line-by-line');
let moment = require('moment');
let parser = require('./data-parser');

parser(findSummerPeriods);

function findSummerPeriods(data) {
    let startDate = moment("1961-01-01", "YYYY-MM-DD");
    let endDate = moment();
    let date = startDate;
    let isSummerPeriod = false;

    let currentSummerDate;
    let minSummerTemperature = 28;
    let numSummerDays = 0;

    while(date.isBefore(endDate)) {
        let temperature = data[date.format("YYYYMMDD")];
        if (temperature >= minSummerTemperature) {
            if (currentSummerDate) {
                numSummerDays++;
            } else {
                currentSummerDate = moment(date)
                numSummerDays = 1;
            }
        } else if (currentSummerDate) {
            console.log(`${currentSummerDate.format("DD-MM-YYYY")} --> ${numSummerDays}`)
            currentSummerDate = undefined;

        }
        date = date.add(1, 'days');
    }


}



