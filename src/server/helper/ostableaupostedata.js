"use strict"

var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odahelper = require('./odahelper');
var ostableaupostedata = require('../seed/data-seed/ostableaupostedata')


module.exports = {
    populate: function (callback) {
        var obj={};
        var mergeostableauposte=[];

        var ostableaupostes = odahelper.oarray(ostableaupostedata);
        async.eachSeries(ostableaupostes,
            function (ostableauposte, ostableaupostecallback) {
                var areashortname = _.map(ostableauposte.ostblareas, 'AreaShortName');
                Models.oStblArea.find({ AreaShortName: { '$in': areashortname } }, '_id',
                    function (err, ostblareaids) {
                        if (err) {
                            throw (err);
                        }
                        else {

                            obj = {


                                "StableauName": ostableauposte.StableauName,
                                "StbleauLongName": ostableauposte.StbleauLongName,
                                "ostblareaids": ostblareaids

                            }
                            mergeostableauposte.push(obj);

                            ostableaupostecallback();

                        }
                    });

            }, function (err) {
              if (err) {
                throw (err);
            }

            else {
            callback(null,mergeostableauposte)}

            }
        );

    }
}



