
// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var Models = require('../omodels');
var odahelper = require('../helper');

async.series({

    removenttBalance: function (callback) {
        Models.nttCompteBalance.remove({}, function (err) {
            if (err) {
                callback(err);
            }
            setTimeout(function () {
                callback(null, 'data removed!')
            }, 200);

        })

    },
    insertnttBalance: function (callback) {

      var _nttbalances = [];

        Models.nttBalance.find({}, {}, function (err, docs) {
            if (err) {
                console.dir(err)
            }

            else {

                var comptereferences = odahelper.odaSubset.reducegroupby(docs)
                _.forEach(comptereferences, function (obj) {

                    var objnstbalance = new Models.nttCompteBalance(
                        {
                            _oexerccompta_id: obj._oexerccompta_id,
                            _otableauposte_id: obj._otableauposte_id,
                            _oreference_id: obj._oreference_id,
                            //_ocompte_id: obj._ocompte_id,

                      //      IntitulCompte: obj.IntitulCompte,
                        //    NumCompte: obj.NumCompte,
                        totalSoldeDebit: obj.SoldeDebit,
                        totalSoldeCredit: obj.SoldeCredit
                        }
                    )
                    _nttbalances.push(objnstbalance);





                    //    callback(JSON.stringify(nstbalanceinputdata))

                });


            }

            async.eachSeries(

                _nttbalances,

                function (objnstbalance, nttbalanceSavedCallBack) {


                  objnstbalance.save(function (err) {

                        if (err) {
                            console.dir(err);
                        }

                        nttbalanceSavedCallBack();


                    });

                },

                function (err) {

                    if (err) console.dir(err);

                    setTimeout(function () {
                        callback(null, `Finished _nttbalances in seeding ${_nttbalances.length} records inserted`);
                    }, 200);

                }
            );

        })
    },
},
    function (err, results) {

        if (err) {
            console.log("Errors = ");
            console.dir(err)
        } else {
            console.log("Results = ");
            console.log(results);
        }
        process.exit(0);
    }

);
