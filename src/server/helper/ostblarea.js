/* jshint node: true */
"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var Models = require('../omodels');
//var async = require('async');

module.exports = {
    getostblarea: function (qyrparm, callback) {
   
        Models.oStblArea.find(qyrparm, {})
            .populate('oreferences')
            .exec(
            function (err, ostblarea) {
                if (err) {
                    throw (err);
                }
                callback(null, ostblarea)


            }

            )

    }
};
