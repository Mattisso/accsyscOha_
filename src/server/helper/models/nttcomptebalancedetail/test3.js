"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../../../config/ohadb').connectserver()
var Models = require('../../../omodels');
var async = require('async');
var objqueriesparams = require('../../objQueriesParams')
var toInitializeInstance = require('../../../SharedKernel/toInitializeInstance');
var _ = require('lodash');
const detaildata = require('./nttcomptebalancedata')
function DetailExists(_comptebalance) {
    var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
    var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
    return getquery;
}
function editComptebalanceDetail(detaildata) {
   var requestparamid=detaildata.CompteBalanceData._id;
    var mergeostableauposte = [],
        obj={}, arr = [];
    arr = detaildata.CompteBalanceData.nttcomptebalancedetails;
   // console.log(arr)
    async.forEach(arr, function (o, callback_s1) {
      //console.log(o)
        if (o._nttcomptebalance_id === undefined &&  o.NumCompte !== null) {
            obj = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, requestparamid, o);
            mergeostableauposte.push(obj);
        // console.log(mergeostableauposte)
        }
        else {
            DetailExists(requestparamid)
                .exec(function (err, results) {
                    if (err) {
                        throw (err)
                    }
                    else {
                        async.forEach(results, function (result, callback_s2) {
                            // console.log(bodydata)
                            if (result._nttcomptebalance_id !== undefined || result._nttcomptebalance_id !== null) {
                                obj = toInitializeInstance.toinit().toUpdateCompteBalanceDetail(result, requestparamid, o);
                                mergeostableauposte.push(obj);
                            }
                            else {
                                if (result._nttcomptebalance_id === undefined && result.NumCompte !== undefined)
                                    var data = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, requestparamid, o);
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
                })
        }
    }, function (err) {
        if (err) {
            throw (err)
        }
        else {
            console.log(mergeostableauposte)
        }
    })
    //arr = body.nttcomptebalancedetails;


}


console.log(editComptebalanceDetail(detaildata))
