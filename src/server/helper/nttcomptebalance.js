"use strict"

var async = require('async');
var odata = require('./models')
var odahelper = require('.')


module.exports = {
    popular: function (callback) {
        async.waterfall([

            function (callback) {
                odata.Nttbalance.popular(function (err, docs) {
                    if (err) throw err
                    else {



                        var mergeostableauposte = [];
                        var obj;


                        var comptereferences = odahelper.odaSubset.odasub().reducegroupby(docs)
                        async.eachSeries(comptereferences, function (elem, secondcallback) {

                            obj = {

                                _otableauposte_id: elem._otableauposte_id,
                                _oexerccompta_id: elem._oexerccompta_id,
                                _oreference_id: elem._oreference_id,
                                SoldeCredit: elem.SoldeCredit,
                                SoldeDebit: elem.SoldeDebit

                            }
                            mergeostableauposte.push(obj);

                            secondcallback();

                        }, function (err) {

                                if (err) throw err;

                                else {
                                    callback(null, mergeostableauposte)

                                }
                            }
                        );
                    }

                })


            }/*,
            function (nttbalances, callback) {

                var balances = odahelper.odaSubset.odasub().reducegroupby(nttbalances)

                callback(null, balances)

            }*/
        ], function (err, results) {


            if (err) {

                throw (err);
            } else {

                callback(null, results)

            }

        })
    }
}
