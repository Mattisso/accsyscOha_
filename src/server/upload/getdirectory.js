
// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var fs = require('fs');
var path = require('path');
var json2csv = require('json2csv');
var buf = new Buffer(1024);
var async = require('async');
const startDir = path.join(__dirname, './data/source');
const endDir = path.join(__dirname, './data/target');

var parsedDirectory = [];

fs.readdir(startDir, function (err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(function (file) {
        var inFilename = startDir + '\\' + file
 var options= { encoding : 'UTF-8'}
 var buf= Buffer.from(inFilename);
        var inJSON = fs.readFileSync(buf,options );
        inJSON = JSON.parse(inJSON);


        var csv = json2csv({ data: inJSON });

        var name = file.substr(0, file.lastIndexOf('.'));
        var extension = '.csv'

        var outfilename = endDir + '\\' + name + extension
       console.log(name)
        fs.writeFile(outfilename, csv, function (err) {
            if (err) throw err;
            console.log('file saved');

        })

    });
});








