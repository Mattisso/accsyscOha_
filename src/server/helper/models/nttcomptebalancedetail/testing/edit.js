// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('../../nttcomptebalancedetail')

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

//console.log(requestBody)

test.NttComptebalancedetailCtrl.editcomptebalanceDetail(requestBody,requestparamid,function(err,docs) {
  if(err) {
    throw (err)
  }
  else {
    console.log(docs)
  }

  })
/*

  test.Nttcomptebalance.init().compteBalanceExists(requestparamid)
  .exec(function(err,docs) {
    if(err) {
      throw (err)
    }
    else {
      console.log(docs)
    }

    })
*/
