


// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');

var _ = require('lodash');

/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var Models = require('../omodels');


var buf = new Buffer(1024);
var async = require('async');
const startDir = path.join(__dirname, './data/source');
const endDir = path.join(__dirname, './data/target');
var inFilename;


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


      fs.readdir(startDir, function (err, files) {
        if (err) {
          return console.error(err);
        }
        else {

          async.forEachOf(files, function (file, secondcallback) {


             inFilename = startDir + '\\' + file

            fs.readFileSync(inFilename, "utf8", function (err, data) {
              if (err)
                return secondcallback(err);
              try {
                var inJSON = JSON.parse(inJSON);
              } catch (e) {
                return secondcallback(e);
              }
              secondcallback();
            });
          }, function (err) {
            if (err)
              console.dir(err);

            console.log(null, inFilename);
          });
        }
      });




    })
  })


})





process.exit(0);






