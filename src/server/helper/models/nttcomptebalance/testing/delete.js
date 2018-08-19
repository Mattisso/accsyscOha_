// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('../nttcomptebalanceCtrl')

var _ = require('lodash');
const  Objdata = require('./editcomptebalancedata')


/*eslint-disable no-unused-vars */
require('../../../../config/ohadb').connectserver()
var toInitializeInstance = require('../../../../SharedKernel/toInitializeInstance')
var requestBody=Objdata.CompteBalanceData
// console.log(comptebalancedata)
var mergeostableauposte = [], obj, data;
/*
test.createModel(requestBody,function(err,docs) {
if(err) {
  throw (err)
}
else {
  console.log(docs)
}

})
*/
var requestparamid= requestBody.CompteBalanceData._id;
//console.log(requestparamid)

test.delete(requestparamid,function(err,docs) {
  if(err) {
    throw (err)
  }
  else {
    console.log(docs)
  }

  })

