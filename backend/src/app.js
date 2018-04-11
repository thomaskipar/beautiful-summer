let request = require('request');
let moment = require('moment');
let config = require('../config/config.json');
let baseUrl = 'http://api.weatherbit.io/v2.0/history/daily';
let schedule = require('node-schedule');

let downloader = require('./data-downloader');
let parser = require('./data-parser');

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

