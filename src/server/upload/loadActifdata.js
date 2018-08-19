// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');
const Json2csvParser = require('json2csv').Parser;

var _ = require('lodash');

/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var Models = require('../omodels');
var balanceActif = require('../helper/bilanActif');


  const outdirname = path.join(__dirname, './data/source/balanceActif.json');
const outFilename = path.join(__dirname, './data/target/balanceActif.csv');


async.series({
  fileInjson: function (callback) {

  balanceActif.popular(function(err, docs){
      if (err) throw err;

      var filename = JSON.stringify(docs);


      fs.writeFile(outdirname, filename, function (err) {
        if (err) {
          return console.error(err);
        }
        setTimeout(function () {
          callback(null, 'Data written successfully!');
        }, 200);

      });


    });


  },
  fileIncsv: function (callback) {


    var inFilename = outdirname;
    var inJSON = fs.readFileSync(inFilename, 'utf8');
    inJSON = JSON.parse(inJSON);

    const fields = ['_oexerccompta_id', '_otableauposte_id', '_oreference_id', 'SoldeDebit', 'SoldeCredit'];

    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(inJSON);
    fs.writeFile(outFilename, csv, function (err) {
      if (err) throw err;
      setTimeout(function () {
        callback(null, 'file saved');
      }, 100);

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
  });





