"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

//require('../../../../server/config/ohadb').connectserver()
var Models = require('../../../omodels');
var async = require('async');
var oda = require('../../oda'),
 objqueriesparams = require('../../objQueriesParams')
var toInitializeInstance = require('../../../SharedKernel/toInitializeInstance');
var _ = require('lodash');
const detaildata = require('./nttcomptebalancedata')

function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}


module.exports = {
  editcomptebalanceDetail: function (requestbody, callback) {

    async.waterfall([

      function (callback) {
        var requestparamid = requestbody.CompteBalanceData._id;
        var mergeostableauposte = [],
          arr = [];
        arr = requestbody.CompteBalanceData.nttcomptebalancedetails;


        async.eachSeries(arr, function (o, callback_s1) {

          if (o._nttcomptebalance_id === undefined || o._nttcomptebalance_id === null) {


            var obj = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, requestparamid, o);

          }
         mergeostableauposte.push(obj);

          DetailExists(requestparamid)
            .exec(function (err, results) {
              if (err) {
                throw (err)
              }
              else {
                async.eachSeries(results, function (result, callback_s2) {

                  if (result._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== null) {

                    var data = toInitializeInstance.toinit().toUpdateCompteBalanceDetail(result, requestparamid, o);

                  }
                  mergeostableauposte.push(data);


                  callback_s2();

                }, function (err) {
                  if (err) {
                    throw (err)
                  }
                  else {
                    callback_s1();
                  }
                }
                );

              }
            })

        }, function (err) {
          if (err) {
            throw err;
          }
          else {
            callback(null, mergeostableauposte)

          }

        }
        )
      },
      function (mergeostableauposte, callback) {

        var mergtableauposte = _.uniqBy(mergeostableauposte,'NumCompte')

        callback(null, mergtableauposte);
      }
    ], function (err, results) {


      if (err) {

        console.dir(err)
      } else {

        callback(null, results)

      }

    }
    );
  }
}
