let request = require('request');
let moment = require('moment');
let config = require('../config/config.json');
let apikey = require('../config/apikey.json').apiKey;
let baseUrl = 'http://api.weatherbit.io/v2.0/history/daily';

console.log('Running backend for beautiful summer app');

let startDate = moment(config.startDate, "YYYY-MM-DD");
let nextDay = moment(startDate).add(1, 'day');

let requestUrl = `${baseUrl}?key=${apikey}&start_date=${startDate.format("YYYY-MM-DD")}&end_date=${nextDay.format("YYYY-MM-DD")}&city=${config.city}&country=${config.country}`
console.log(requestUrl);

// request('http://www.google.com', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });