// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');


var _ = require('lodash');
// const detaildata= require('../helper/models/index').Oreferences

/*eslint-disable no-unused-vars */
// require('../../server/config/ohadb').connectserver()
var Models = require('../omodels');

const objdata= require('./odaCompteBalanceData').CompteBalanceData


var BuildnttCompteBalance = function (obj) {
//let _nttcomptebalancedetails= obj.nttcomptebalancedetails;
var test = new Models.nttCompteBalance(
 {'_oexerccompta_id': obj._oexerccompta_id,
  '_otableauposte_id': obj._otableauposte_id,
  '_oreference_id': obj._oreference_id});

  obj.nttcomptebalancedetails.forEach(function(entry) {

test.addBalanceDetail(
  {"_nttcomptebalance_id": test._id,
"NumCompte":  entry.NumCompte,
"IntitulCompte": entry.IntitulCompte,
"SoldeDebit": entry.SoldeDebit,
"SoldeCredit": entry.SoldeCredit
})

});
return  test;

}

var init = function(obj) {
  var balance= BuildnttCompteBalance(obj)
  return {
    balance: balance,
    getData: balance.getData()

  }

}

 console.log(JSON.stringify(init(objdata)));
 // console.log(init(objdata));





/*
 var balance= new Models.nttCompteBalance(
  {_oexerccompta_id: objdata._oexerccompta_id,
   _otableauposte_id: objdata._otableauposte_id,
   _oreference_id: objdata._oreference_id})


   console.log(balance);

 var result=[];
 var _detail=objdata.nttcomptebalancedetails;
     for (var i=0; i<_detail.length; i++ ){

       var objdetail= new Models.nttCompteBalanceDetail(
         {"_nttcomptebalance_id": balance._id,
         "NumCompte":  _detail[i].NumCompte,
         "IntitulCompte": _detail[i].IntitulCompte,
         "SoldeDebit": _detail[i].SoldeDebit,
         "SoldeCredit": _detail[i].SoldeCredit
        })
 result.push(objdetail);
     }



     console.log(result)


var details = [];
var balance= new Models.nttCompteBalance(
  {_oexerccompta_id: objdata._oexerccompta_id,
   _otableauposte_id: objdata._otableauposte_id,
   _oreference_id: objdata._oreference_id})

   var _arr= objdata.nttcomptebalancedetails.forEach(function(entry) {
    nttcomptebalce.addBalanceDetail(
      {//"_nttcomptebalance_id": test._Id,
      "NumCompte":  entry.NumCompte,
      "IntitulCompte": entry.IntitulCompte,
      "SoldeDebit": entry.SoldeDebit,
      "SoldeCredit": entry.SoldeCredit
     })

    });

    var result=[];
var _detail=objdata.nttcomptebalancedetails;
    for (var i=0; i<_detail.length; i++ ){

      var objdetail= new Models.nttCompteBalanceDetail(
        {"_nttcomptebalance_id": nttcomptebalce._Id,
        "NumCompte":  _detail[i].NumCompte,
        "IntitulCompte": _detail[i].IntitulCompte,
        "SoldeDebit": _detail[i].SoldeDebit,
        "SoldeCredit": _detail[i].SoldeCredit
       })
result.push(objdetail);
    }



    console.log(nttcomptebalce)
   // console.log(nttcomptebalce.getData().totalSoldeDebit)
    console.log(result)

*/

