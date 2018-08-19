
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../../../config/ohadb').connectserver()
var Models = require('../../../omodels');
var async = require('async');
var objqueriesparams = require('../../objQueriesParams')
var toInitializeInstance = require('../../../SharedKernel/toInitializeInstance');
var _=require('lodash');
const detaildata = require('./nttcomptebalancedata')



function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}

  function editComptebalanceDetail( ) {
    var mergeostableauposte = [],
      obj, arr = [];
      arr= detaildata.CompteBalanceData.nttcomptebalancedetails;
//arr = body.nttcomptebalancedetails;
var bodyparamid = detaildata.CompteBalanceData._id

    DetailExists('5aee117f5058311d84641b3d')
      .exec(function (err, results) {
        if (err) {
          throw err;
        }
        else {
     //     console.log(results)
          async.forEachSeries(results, function (result, callback_s1) {

            if (result._nttcomptebalance_id !== undefined || result._nttcomptebalance_id !== null) {

              async.forEachSeries(arr, function (bodydata, callback_s2) {
             //   console.log(bodydata)
                if (bodydata._nttcomptebalance_id !== undefined || bodydata._nttcomptebalance_id !== null) {
                  obj = toInitializeInstance.toinit().toUpdateCompteBalanceDetail(result, bodyparamid, bodydata);

                  mergeostableauposte.push(obj);
                }
                else {
                  if (bodydata._nttcomptebalance_id === undefined && bodydata.NumCompte !== undefined)

                  var data = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, bodyparamid, bodydata);


                  mergeostableauposte.push(_.merge(obj, data));
                  callback_s2();
                }
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

          }, function (err) {

            if (err) {

              throw (err)
            }
            else {
              console.log(mergeostableauposte)
            }
          }
          )


        }
      })
  }


 editComptebalanceDetail()
