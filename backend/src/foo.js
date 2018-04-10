let LineByLineReader = require('line-by-line');
let moment = require('moment');

let lr = new LineByLineReader('../data/recent.txt');
let data = {}

parseFile('../data/recent.txt', data, function() {
    parseFile('../data/historic.txt', data, function() {
       console.log(data);
       console.log('foo');
    });
});

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

