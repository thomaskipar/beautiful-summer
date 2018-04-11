let LineByLineReader = require('line-by-line');
let moment = require('moment');

let lr = new LineByLineReader('../data/recent.txt');
let data = {}

parseFile('../data/recent.txt', data, function() {
    parseFile('../data/historic.txt', data, function() {
       console.log(data);
       console.log('foo');
       findSummerPeriods();
    });
});

function findSummerPeriods() {
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

function parseFile(fileName, model, callback) {
    let lr = new LineByLineReader(fileName);

    lr.on('error', function (err) {
    });

    lr.on('line', function (line) {
        let values = line.split(";");
        data[values[1]] = parseFloat(values[15].trim());
    });

    lr.on('end', function () {
        callback();
    });
}

