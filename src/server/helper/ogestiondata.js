"use strict"

var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odahelper = require('./odahelper');
var ogestiondata = require('../seed/data-seed/oGestiondata')


module.exports = {
    populate: function (callback) {
        async.waterfall([
            function (callback) {
                var obj = {};
                var mergeoreference=[];

              var ogestions = odahelper.oarray(ogestiondata);
                async.eachSeries(ogestions,
                    function (ogestion, ogestioncallback) {
                        var   qyrparm= ogestion.RefCode;

                        Models.oReference.find({ RefCode: { '$in': qyrparm } }, '_id  RefCode Description ocomptes',
                            function (err, ocompteids) {
                                if (err) {
                                    throw (err);
                                }
                                else {

                                  //  console.log(JSON.stringify(ocompteids))
                                    async.eachSeries(ocompteids, function (ocompteid, ocompteidscallback) {
                                    obj=
                                        {_refcodeogestion_id :ocompteid._id,
                                            RefCode:ocompteid.RefCode,
                                            Description:ocompteid.Description,
                                            _ocomptegestion_id:ocompteid.ocomptes[0]._id,
                                            oreferences:ogestion.oreferences

                                        }
                                        mergeoreference.push(obj);

                                        ocompteidscallback()
                                    }, function (err) {
                                        if (err) {
                                            throw (err);
                                        } else {


                                            ogestioncallback();
                                        }
                                    });
                                }
                            });

                    }, function (err) {
                      if (err) {
                        throw (err);
                    } else{
                      callback(null, mergeoreference)

                    }


                    }
                );

            },

               function (ogestions,callback) {
                var mergeoreference=[];
                //var oreferences =[];

            //    var ogestions = odahelper.oarray(ogestiondata);
                async.eachSeries(ogestions,
                    function (ogestion, ogestioncallback) {



                            var qyrparm = _.map(ogestion.oreferences, 'RefCode');

                            Models.oReference.find({ RefCode: { '$in': qyrparm } }, '_id RefCode Description',
                                function (err, docs) {
                                    if (err) {
                                        throw (err);
                                    }

                                    else {

                                        var obj = {};

                                        //	 console.log(JSON.stringify(otaleaupostes))

                                        obj = {
                                            _refcodeogestion_id :ogestion._refcodeogestion_id,
                                            RefCode:ogestion.RefCode,
                                            Description:ogestion.Description,
                                            _ocomptegestion_id:ogestion._ocomptegestion_id,
                                            oreferences: docs

                                        }
                                        mergeoreference.push(obj);



                                            ogestioncallback();

                                    }



                    });



                    }, function (err) {

                      if (err) {
                        throw (err);
                    }

                    else {
                        callback(null, mergeoreference)
                      }

                    }
                );

               },


        ], function (err, results) {


            if (err) {

                throw (err);
            } else {

                callback(null, results)

            }

        });
    }
}




