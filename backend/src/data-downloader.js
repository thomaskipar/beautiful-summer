let config = require('../config/config.json');
let fs = require('fs');
var yauzl = require("yauzl");
var Client = require('ftp');

let tmpFile = 'tmp';

updateData('../data/recent.txt', function () {
    console.log('done');
});

function extractData(outputPath, callback) {

    yauzl.open(tmpFile, {lazyEntries: true}, function (err, zipfile) {
        if (err) throw err;

        zipfile.readEntry();

        zipfile.on("entry", function (entry) {
            if (entry.fileName.startsWith('produkt')) {
                zipfile.openReadStream(entry, function (err, readStream) {
                    if (err) throw err;
                    readStream.on("end", function () {
                        zipfile.readEntry();
                        callback();
                    });
                    var myFile = fs.createWriteStream(outputPath);
                    readStream.pipe(myFile);
                });
            } else {
                zipfile.readEntry();
            }
        });
    });
}

function updateData(outputPath, callback) {
    let host = 'ftp-cdc.dwd.de';
    let downloadPath = `pub/CDC/observations_germany/climate/daily/kl/recent/tageswerte_KL_${config.weatherStation}_akt.zip`


    var c = new Client();
    c.on('ready', function () {
        c.get(downloadPath, function (err, stream) {
            if (err) {
                throw err;
            }
            stream.once('close', function () {
                c.end();
                extractData(outputPath, callback);
            });
        });
    });
    c.connect({host});

}

module.exports = updateData