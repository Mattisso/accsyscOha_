// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var Models = require('../omodels');
var odahelper = require('../helper');
var nttcomptebalancedetaildata= require('../helper/nttcomptebalancedetaildata')
async.series({



    removenttBalance: function (callback) {
        Models.nttCompteBalanceDetail.remove({}, function (err) {
            if (err) {
                callback(err);
            }
            setTimeout(function () {
                callback(null, 'data removed!')
            }, 200);

        })

    },
    insertnttCompteBalanceDetail: function (callback) {
        nttcomptebalancedetaildata.popular(function (err, docs) {
            if (err) {
                console.dir(err)
            }

            else {
                var _nttbalances = [];

                _.forEach(docs, function (obj) {

                    var objnstbalance = new Models.nttCompteBalanceDetail(
                        {
                         _nttcomptebalance_id: obj._nttcomptebalance_id,
                          IntitulCompte: obj.IntitulCompte,
                        NumCompte: obj.NumCompte,
                        SoldeDebit: obj.SoldeDebit,
                        SoldeCredit: obj.SoldeCredit
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
                        callback(null, `Finished insertnttCompteBalanceDetail  in seeding ${_nttbalances.length} records inserted`);
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
