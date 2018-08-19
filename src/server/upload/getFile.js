
// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
/*eslint-disable no-unused-vars */


var fs = require('fs');
var path = require('path');
var json2csv = require('json2csv');
var buf= new Buffer(1024);
var async = require('async');
const startDir =path.join(__dirname,'./data/source');
const endDir =path.join(__dirname,'./data/target');

async.parallel([
function(callback){
    var parsedDirectory = [];
    fs.stat(startDir, function (err, stats) {
        if (err) {
            return console.error(err);
        }

        fs.open(startDir, 'r+', function (err, fd) {
            if (err) {
                return console.error(err);
            }

            fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
                if (err) {
                    console.log(err);
                }
                if (bytes > 0) {
                    console.log(buf.slice(0, bytes).toString());
                }

                fs.readdir(startDir, function (err, files) {
                    if (err) {
                        return console.error(err);
                    }
                    files.forEach(function (file) {
                        parsedDirectory.push(file);
                    //    console.log(parsedDirectory);
                    });
                });

                fs.close(fd, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File closed successfully.");
                    callback(null,  parsedDirectory);
                });

            })
        })


    })



    }


],

function (err, results) {

async.waterfall([
    function(callback){

        async.forEach(results, function(result, callback){
            fs.readFileSync(result, "utf8",function(err, Buffer) {

                if (err) throw (err)
             var injson=   JSON.parse(buf.toString())   ;

                fs.writeFile(endDir,  json2csv(injson), function(err) {
                    if (err) throw err;
                    console.log('file saved');

                    callback();
                  })
                  callback(null, '');
            }
        )



        }, function (err) {
            if (err)
                console.error(err.message);
            // configs is now a map of JSON data
            callback(null, 'loaded!');
        })


    }/*,
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }*/
], function (err, result) {
   if (err) console.dir(err)
   console.log(null, 'success')
});


            process.exit(0);
        }
);

