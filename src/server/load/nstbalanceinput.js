// getting-started.js
"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var async = require('async');
var Models = require('../omodels');
var fs = require('fs');

var _ = require('lodash');
var path = require('path');

var balanceinputdata = require('./loadbalancesheet')
const startDir = path.join(__dirname, '../../public/OdaImportFolder');

async.series({

  removensbalanceinput: function (callback) {
    Models.nstBalanceInput.remove({}, function (err) {
      if (err) {
        callback(err);
      }
      setTimeout(function () {
        callback(null, 'Removed!')
      }, 200);

    })

  },


  insertnstbalanceinput: function (callback) {
    //    var nstbalanceinputs = [];
    var _nstbalanceinputs = [];

    balanceinputdata.popular(function (err, docs) {


      if (err) {
        throw (err);
      }

      _.forEach(docs, function (doc) {

        var objbalanceinput = new Models.nstBalanceInput(
          {

            NumCompte: doc.NumCompte,
            IntitulCompte: doc.IntitulCompte,
            SoldeDebit: doc.SoldeDebit,
            SoldeCredit: doc.SoldeCredit
          }
        )
        _nstbalanceinputs.push(objbalanceinput);
      });


      for (var i = 0; i < _nstbalanceinputs.length; i++) {
        var obj = _nstbalanceinputs[i];

      }

      console.log("Populating database with %s nstbalanceinputs", _nstbalanceinputs.length);

      async.eachSeries(

        _nstbalanceinputs,

        function (obj, ocompteSavedCallBack) {

          obj.save(function (err) {

            if (err) {
              console.dir(err);
            }

            ocompteSavedCallBack();
          });

        },

        function (err) {

          if (err) console.dir(err);


          setTimeout(function () {

            callback(null, `Finished nstbalanceinputs in seeding ${_nstbalanceinputs.length} records inserted`);
          }, 200);


        });

    })
  },
  SourceFileDeleted: function (callback) {


    fs.readdir(startDir, function (err, files) {
      if (err) {
        return console.error(err);
      }
      files.forEach(function (file) {
        var inFilename = startDir + '\\' + file


        fs.stat(inFilename, function (err, stats) {
          if (err) {
            return console.error(err);
          }
          if (stats.isFile() === true) {

            fs.unlink(inFilename, function (err) {
              if (err) {
                callback(err);
              }
              setTimeout(function () {
                callback(null, 'File deleted successfully!')
              }, 200);

            })

          }
          else {

            console.log('File not Exists')
          }

        });

      });
    })

  }

},

  function (err, results) {

    if (err) {
      console.log("Errors = ");
      console.dir(err)
    } else {
      console.log("Results = ");
      console.log(results);
    }


    process.exit(0);
  }
);
