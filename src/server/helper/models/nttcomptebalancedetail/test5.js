"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

//require('../../../../server/config/ohadb').connectserver()
var Models = require('../../../omodels');
var async = require('async');
var oda = require('../../oda'),
 objqueriesparams = require('../../objQueriesParams'),
 odasubset = require('../../odaSubset')
var toInitializeInstance = require('../../../SharedKernel/toInitializeInstance');
var detailModel = require('./nttcomptebalancedetail')
var _ = require('lodash');
//var _ = require('lodash');
// const detaildata = require('./nttcomptebalancedata')

function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}
// var requestparamid = detailModel.CompteBalanceData._id;


module.exports = {
  editcomptebalanceDetail: function (requestbody, requestparamid, callback) {

    async.waterfall([

      function (callback) {
        //   var requestparamid = requestbody.CompteBalanceData._id;
        var mergeostableauposte = [],
          arr = [];
        arr = requestbody.CompteBalanceData.nttcomptebalancedetails;

        async.forEach(arr, function (o, callback_s1) {

          if ((o._nttcomptebalance_id === undefined && o.NumCompte!== undefined) || (o._nttcomptebalance_id === null && o.NumCompte!== undefined)) {

            var obj = detailModel.toinit().toCompteBalanceDetail(requestparamid, o);
       //     obj= odasubset.odasub().findNumCompteBy(mergeostableauposte,obj);
       if (mergeostableauposte.indexOf(obj.NumCompte) == -1) {
        mergeostableauposte.push(obj);
      // console.log(obj["NumCompte"])
       }
          }

        /*  if (mergeostableauposte.indexOf(obj.NumCompte) > -1) {
            mergeostableauposte.push(obj);
          }*/
      //  mergeostableauposte.push(obj);

          DetailExists(requestparamid)
            .exec(function (err, results) {
              if (err) {
                throw (err)
              }
              else {
                async.eachSeries(results, function (resultdetail, callback_s2) {

                  if (resultdetail._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== null) {

                    var data = detailModel.toinit().toUpdateCompteBalanceDetail(resultdetail, requestparamid, o);


                    if (mergeostableauposte.indexOf(data["NumCompte"]) == -1) {
                      mergeostableauposte.push(data);
                    // console.log(obj["NumCompte"])
                     }

                  }
               //   console.log(mergeostableauposte)

                //  mergeostableauposte.push(data);

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

        var _arrDetails = [],
          objdetail;

        var mergtableauposte = _.uniqBy(mergeostableauposte, 'NumCompte')

        for (var i = 0; i < mergtableauposte.length; i++) {
          objdetail = new Models.nttCompteBalanceDetail(mergtableauposte[i]);

          if (_arrDetails.indexOf(mergtableauposte[i] == -1)) {
            _arrDetails.push(objdetail);
        }
      }

        // _arr=odasubset.odasub().findNumCompteBy(_arrDetails, objdetail.NumCompte);


        callback(null, _arrDetails);

      }
    ], function (err, results) {

      if (err) {

        console.dir(err)
      } else {

        callback(null, results)

      }

    }
    );
  },
}
