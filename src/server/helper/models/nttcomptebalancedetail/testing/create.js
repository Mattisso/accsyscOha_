// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../../../../config/ohadb').connectserver()
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('../../nttcomptebalancedetail')

var _ = require('lodash');
const  Objdata = require('./createcomptebalancedata')


/*eslint-disable no-unused-vars */

//var Models = require('../../../omodels');
//var detailCtrl = require('./nttComptebalancedetailCtrl')
var toInitializeInstance = require('../../../../SharedKernel/toInitializeInstance')
var requestBody=Objdata.CompteBalanceData;
// console.log(requestBody)
var mergeostableauposte = [], obj, data;

test.NttcomptebalanceCtrl.create(requestBody,function(err,docs) {
if(err) {
  throw (err)
}
else {
  console.log(docs)
}

})



///console.log(test.Nttcomptebalance.init().toInitializeInstance(requestBody));
