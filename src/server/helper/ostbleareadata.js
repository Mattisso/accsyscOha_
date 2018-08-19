"use strict"
var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odahelper = require('./odahelper');
var ostbleareadata = require('../seed/data-seed/ostbleareadata')

module.exports = {
    populate: function (callback) {
        var obj={};
        var mergeoreference=[];

        var ostbleareas = odahelper.oarray(ostbleareadata);
        async.eachSeries(ostbleareas,
            function (ostblearea, ostbleareacallback) {
                var comptenumber = _.map(ostblearea.ocomptes, 'CompteNumber');
                Models.oCompte.find({ CompteNumber: {'$in': comptenumber } }, '_id',
                    function (err, ocompteids) {
                        if (err) {
                            throw (err);
                        }
                        else {
                            obj = {


                                "AreaShortName": ostblearea.AreaShortName,
                                "AreaLongName": ostblearea.AreaLongName,
                                "ocompteids": ocompteids

                            }
                            mergeoreference.push(obj);

                            ostbleareacallback();

                        }
                    });

            }, function (err) {
              if (err)
              {
                throw (err);
              }
              else {


             callback(null,mergeoreference)
              }

            }
        );

    }
}



