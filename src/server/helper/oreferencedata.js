"use strict"

var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odahelper = require('./odahelper');
var oreferencedata = require('../seed/data-seed/oreferencedata')


module.exports = {
    populate: function (callback) {
        var obj={};
        var mergeoreference=[];

        var oreferences = odahelper.oarray(oreferencedata);
        async.eachSeries(oreferences,
            function (oreference, oreferencecallback) {
                var numcomptes = _.map(oreference.ocomptes, 'CompteNumber');
                Models.oCompte.find({ CompteNumber: { '$in': numcomptes } }, '_id',
                    function (err, ocompteids) {
                        if (err) {
                            throw (err);
                        }
                        else {

                            obj = {
                                RefCode: oreference.RefCode,
                                Description: oreference.Description,
                                ocompteids: ocompteids

                            }
                            mergeoreference.push(obj);
                            oreferencecallback()

                        }

                    });

            }, function (err) {
              if (err) {
                throw (err);
            }
            else {

            callback(null,mergeoreference)

            }


            }
        );

    }
}



