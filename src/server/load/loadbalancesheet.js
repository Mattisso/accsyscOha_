"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var async = require('async');

var XLSX = require('xlsx/types');

var fs = require('fs');
var path = require('path');

const startDir = path.join(__dirname, '../../public/OdaImportFolder');


module.exports = {
  popular: function (callback) {
    async.waterfall([

      function (callback) {


        fs.readdir(startDir, function (err, files) {
          if (err) {
            throw (err);
          }
          files.forEach(function (file) {
            var inFilename = startDir + '\\' + file

            fs.stat(inFilename, function (err, stats) {
              if (err) {
                throw (err)
              }
              if (stats.isFile() === true) {

                setTimeout(function () {
                  callback(null, inFilename);

                }, 200);

              }
              else {

                console.dir('File not Exists')
              }


            });

          });
        })

      },
      function (getFile, callback) {


        var workbook = XLSX.readFile(getFile)

        var first_sheet_name = workbook.SheetNames[0];
        var oworksheet = workbook.Sheets[first_sheet_name];

        var options = {
          raw: true,
          header: ['NumCompte', 'IntitulCompte', 'SoldeDebit', 'SoldeCredit']
        }
        var worksheettojson = XLSX.utils.sheet_to_json(oworksheet, options);

        setTimeout(function () {
          callback(null, worksheettojson);
        }, 100);

      }

    ]
      , function (err, results) {


        if (err) {

          console.dir(err)
        } else {

          callback(null, results)
          //  console.log(results)
        }

      });
  }
}

