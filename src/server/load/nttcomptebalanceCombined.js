
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

  insertnttBalance: function (callback) {

    var _nttbalances = [];

    Models.nttBalance.find({}, {}, function (err, docs) {
      if (err) {
        console.dir(err)
      }

      else {

        var comptereferences = odahelper.odaSubset.odasub().reducegroupby(docs)
        _.forEach(comptereferences, function (obj) {

          var objnstbalance = new Models.nttCompteBalance(
            {
              _oexerccompta_id: obj._oexerccompta_id,
              _otableauposte_id: obj._otableauposte_id,
              _oreference_id: obj._oreference_id,
              //_ocompte_id: obj._ocompte_id,
              // IntitulCompte: obj.IntitulCompte,
              // NumCompte: obj.NumCompte,
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

            var _details = [];

            _.forEach(docs, function (doc) {
              if (objnstbalance._otableauposte_id ===doc._otableauposte_id && objnstbalance._oreference_id === doc._oreference_id &&
                objnstbalance._oexerccompta_id === doc._oexerccompta_id) {

                var objdetail = new Models.nttCompteBalanceDetail(
                  {
                    _nttcomptebalance_id: objnstbalance._id,
                    IntitulCompte: doc.IntitulCompte,
                    NumCompte: doc.NumCompte,
                    SoldeDebit: doc.SoldeDebit,
                    SoldeCredit: doc.SoldeCredit
                  }
                )
                _details.push(objdetail);

              }

              //    callback(JSON.stringify(nstbalanceinputdata))

            });
            async.eachSeries(

              _details,

              function (objdetail, detailSavedCallBack) {


                objdetail.save(function (err) {

                  if (err) {
                    console.dir(err);
                  }

                  detailSavedCallBack();
                });

              },

              function (err) {

                if (err) console.dir(err);
/*
                setTimeout(function () {
                  callback(null, `Finished insertnttCompteBalanceDetail  in seeding ${_details.length} records inserted`);
                }, 200);*/

               nttbalanceSavedCallBack();
              }
            );
            // nttbalanceSavedCallBack();


          });

        },

        function (err) {

          if (err) console.dir(err);

         /* setTimeout(function () {
            callback(null, `Finished insertnttCompteBalanceDetail  in seeding ${_details.length} records inserted`);
          }, 200);
*/
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
