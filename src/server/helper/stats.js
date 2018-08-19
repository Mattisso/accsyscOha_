"use strict"

/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

var models = require('../omodels'),
async = require('async');

module.exports = function(callback) {

async.parallel([
    function(next) {
        models.oTableauPoste.count({}, next);
    },
    function(next) {
        models.oStableauPoste.count({}, next);
    },
    function(next) {
        models.oStblArea.count({}, next);
    },
    function(next) {
        models.oReference.count({}, next);
    },
    function(next) {
        models.oCompte.count({}, next);
    }


], function(err, results){
    callback(null, {
        otableaupostsCount: results[0],
        ostableaupostsCount: results[1],
        ostblareasCount : results[2],
        oreferencesCount: results[3],
        ocomptesCount: results[4]
        //,
      //  views: results[2],
      //  likes: results[3]
    });
    console.log(results);
});
};
