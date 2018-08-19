"use strict"

var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odahelper = require('./odahelper');
var otableaupostedata = require('../seed/data-seed/otableaupostedata')


module.exports = {
    populate: function (callback) {
        var obj = {};
        var mergeotableauposte=[];

        var otableaupostes = odahelper.oarray(otableaupostedata);
        async.eachSeries(otableaupostes,
            function (otableauposte, otableaupostecallback) {
                var stableauname = _.map(otableauposte.ostableaupostes, 'StableauName');
                Models.oStableauPoste.find({ StableauName: { '$in': stableauname } }, '_id',
                    function (err, ostableauposteids) {
                        if (err) {
                            throw (err);
                        }
                        else {
                            obj = {

                              //   tblRefCode: otableauposte.tblRefCode,
                              //   Description: otableauposte.Description,
                                TableauName: otableauposte.TableauName,
                                tableauLongName: otableauposte.tableauLongName,
                                ostableauposteids: ostableauposteids

                            }
                            mergeotableauposte.push(obj);

                            otableaupostecallback();

                        }

                    });

            }, function (err) {

                if (err) {
                    throw (err);
                }

                callback(null, mergeotableauposte)

            }
        );

    }
}



