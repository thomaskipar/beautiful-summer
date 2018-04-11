let LineByLineReader = require('line-by-line');

let lr = new LineByLineReader('../data/recent.txt');


function parse(callback) {
    let data = {};

    parseFile('../data/recent.txt', data, function () {
        parseFile('../data/historic.txt', data, function () {
            callback(data);
        });
    });
}

function parseFile(fileName, model, callback) {
    let lr = new LineByLineReader(fileName);

    lr.on('error', function (err) {
    });

    lr.on('line', function (line) {
        let values = line.split(";");
        model[values[1]] = parseFloat(values[15].trim());
    });

    lr.on('end', function () {
        callback();
    });
}

module.exports = parse;