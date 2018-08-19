


// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');

var _ = require('lodash');
var ohashared=require('../helper/models/ohashared')
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var Models = require('../omodels');

var odahelper= require('../helper/odahelper');



    const outdirname= path.join(__dirname,'../upload/data/source/file.json');


    async.series([

    function  (callback) {
        var viewModel = {

        };
        ohashared(viewModel, function (viewModel) {

            //   console.log(JSON.stringify(viewModel));
          //  var filename = JSON.stringify(viewModel.sidebar);



        var filename =JSON.stringify(odahelper.oarray(viewModel.sidebar.ocomptes));
        var oreferences = odahelper.oarray(viewModel.sidebar.oreferences);
        var ostblareas = viewModel.sidebar.ostblareas;
        var ostableaupostes = odahelper.oarray(viewModel.sidebar.ostableaupostes);
        var otableaupostes = odahelper.oarray(viewModel.sidebar.otableaupostes);
        var ocomptes = odahelper.oarray(viewModel.sidebar.ocomptes);

          //  console.log(filename)

            fs.writeFile(outdirname, filename, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("Data written successfully!");
                callback(null, filename);
            });

        });
        // var oreferenceocompte=  helper.oreferenceocompte.popular(next)
        //callback(null, viewModel);
    }

],

function (err, results) {

            console.log("\n\n--- Database seed progam completed ---");

            if (err) {
                console.log("Errors = ");
                console.dir(err)
            } else {
                console.log("Results = ");
                console.log(results);
            }

            console.log("\n\n--- Exiting database seed progam ---");
            // Exit the process to get back to terrminal console
            process.exit(0);
        }

);
