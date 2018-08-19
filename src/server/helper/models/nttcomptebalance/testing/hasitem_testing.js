// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

require('../../../../config/ohadb').connectserver()
var Models = require('../../../../omodels');
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('../../nttcomptebalance')
var odasubset= require('../../../odaSubset')
var objqueriesparams = require('../../../objQueriesParams')

var _ = require('lodash');
const  Objdata = require('./createcomptebalancedata')


function hasItem (item,items) {
  return items.indexOf(item) !== -1;
  }


function removeItem (item, items) {
  var itemIndex = items.indexOf(item);
  if (itemIndex !== -1) {
  items.splice(itemIndex, 1);
  }
  }




function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}



//var Models = require('../../../omodels');
//var detailCtrl = require('./nttComptebalancedetailCtrl')
var toInitializeInstance = require('../../../../SharedKernel/toInitializeInstance')
var requestBody=Objdata.CompteBalanceData;
// console.log(requestBody)
var mergeostableauposte = [], obj;
mergeostableauposte=requestBody.nttcomptebalancedetails;

function createComptebalanceDetail(mergeostableauposte) {
  var arr = [],
  data,
  _arrdetails =[];



    DetailExists("5b40057e361bc2116cebc379")
    .exec(function (err, results) {
      if (err) {
        throw (err)
      }

      else {
        for (var i = 0; i < mergeostableauposte.length; i++) {
          var obj = new Models.nttCompteBalanceDetail(mergeostableauposte[i]);
          if (arr.indexOf(mergeostableauposte[i]==-1)) {
            arr.push(obj);

          }

        }
        _.without(arr,results);

      console.log(arr)
      //    console.log(o)

     //  //   data = hasItem(arr, resultdetail)
     //     console.log(resultdetail)
      //    mergeostableauposte.push(data);


      }

  })



}

createComptebalanceDetail(mergeostableauposte)


