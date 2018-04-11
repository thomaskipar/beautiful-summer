let request = require('request');
let moment = require('moment');
let config = require('../config/config.json');
let baseUrl = 'http://api.weatherbit.io/v2.0/history/daily';
let schedule = require('node-schedule');
let express = require('express');

let downloader = require('./data-downloader');
let parser = require('./data-parser');
let warmestDays = require('./warm-days-finder');

let data = {};

let j = schedule.scheduleJob('* 0 * * *', function(){
    updateDataModel();
});

function updateDataModel() {
    console.log('Updating data...')
    downloader('../data/recent.txt', function() {
        parser(function(newData) {
            data = newData;
            console.log('... data successfully updated!');
        })
    });
}


console.log('Running backend for beautiful summer app');
updateDataModel();

var app = express();
var port = 8080;

app.use(express.static('../../src/frontend'));

app.get('/api/data', function (req, res) {
    let result = Object.assign(config);
    result.warmestDays = warmestDays(data, config.year);

    let historic = [];
    for(let year = config.firstYear; year < config.year; year++) {
        historic.push({year: year, warmestDays: warmestDays(data, year)})
    }
    result.historic = historic;

    res.json(result);
});

app.listen(8080, function () {
    console.log(`Backend is listening on port ${port}`);
});