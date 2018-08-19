// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../../../../config/ohadb').connectserver()
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('../../nttcomptebalance')
var odasubset= require('../../../odaSubset')

var _ = require('lodash');
const  Objdata = require('./createcomptebalancedata')
var paralellcreate= require('../../createcomptebalance')


/*eslint-disable no-unused-vars */

//var Models = require('../../../omodels');
//var detailCtrl = require('./nttComptebalancedetailCtrl')
var toInitializeInstance = require('../../../../SharedKernel/toInitializeInstance')
var requestBody=Objdata.CompteBalanceData;
// console.log(requestBody)
var mergeostableauposte = [], obj, data;
/*
test.createModel(requestBody,function(err,docs) {
if(err) {
  throw (err)
}
else {
  console.log(docs)
}

})*/

console

/*

paralellcreate(requestBody,function(err,docs) {
  if(err) {
    throw (err)
  }
  else {
    console.log(docs)
  }

  })
*/
