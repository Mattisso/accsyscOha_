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
function editComptebalanceDetail( body, requestparamid, callback) {
var mergeostableauposte = [],
obj, arr = [];
arr= body.nttcomptebalancedetails;

async.eachOfSeries(arr, function(o,callback_s1) {
if (body._nttcomptebalance_id === undefined && body.NumCompte !== undefined) {
obj = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, requestparamid, body);
mergeostableauposte.push(obj);
callback_s1();
}
else {
DetailExists(requestparamid)
.exec(function(err, results){
if (err) {
throw (err)
}
else {
async.forEachSeries(results, function (result, callback_s2) {
// console.log(bodydata)
if (result._nttcomptebalance_id !== undefined || result._nttcomptebalance_id !== null) {
obj = toInitializeInstance.toinit().toUpdateCompteBalanceDetail(result, requestparamid, body);
mergeostableauposte.push(obj);
}
else {
if (body._nttcomptebalance_id === undefined && body.NumCompte !== undefined)
var data = toInitializeInstance.toinit().toCompteBalanceDetail(Models.nttCompteBalanceDetail, requestparamid, body);
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
console.log('not found')
}
})
//arr = body.nttcomptebalancedetails;


callback(null, arr)
}
editComptebalanceDetail(detaildata)
