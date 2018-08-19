// getting-started.js
//var mongoose = require('mongoose');
'use strict'
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var path = require('path');
var Models = require(path.join(__dirname, '../omodels/index.js'));
var seeddata = require('./data-seed');

var ogestiondata = require('../helper/ogestiondata');

async.series({

    removeogestion: function (callback) {
        Models.oGestion.remove({}, function (err) {
            if (err) {
                callback(err);
            }
            setTimeout(function () {
                callback(null, 'ocomptes Removed!')
            }, 200);

        })

    },

    insertogestion: function (callback) {

        ogestiondata.populate(function (err, oGestions) {
            var _ogestions = [],
            ogestions=[];
            //  var _ogestiondata=[];
            // var objogestion={};

            if (err) {
                throw (err);
            }

            _.forEach(oGestions, function (ogestion) {



                var objogestion = new Models.oGestion(
                    {
                        _refcodeogestion_id: ogestion._refcodeogestion_id,
                        _ocomptegestion_id: ogestion._ocomptegestion_id,
                        oreferences: ogestion.oreferences

                    }
                )

                console.log(objogestion)
                _ogestions.push(objogestion);
            });


            for (var i = 0; i < _ogestions.length; i++) {
                var obj = _ogestions[i];
            }
            ogestions.push(obj)

            async.eachSeries(

                ogestions,

                function (obj, ogestionsavedCallBack) {


                    obj.save(function (err) {

                        if (err) {
                            throw (err);
                        }

                        ogestionsavedCallBack();
                    });

                },

                function (err) {

                    if (err) throw (err);

                    setTimeout(function () {
                        callback(null, `Finished ogestion in seeding ${_ogestions.length} records inserted`)
                    }, 200);


                }
            );



        })

    },
},

    // This function executes when everything above is done
    function (err, results) {


        if (err) {
            console.log("Errors = ");
          throw err;
        } else {
            console.log("Results = ");
            console.log(results);
        }

        process.exit(0);
    }
);
