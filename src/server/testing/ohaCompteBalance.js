/* // fitnessApp.nttCompteBalance
var ohaCompteBalance = (function () {

  "use strict";

  var nttCompteBalance = function (_oexerccompta_id, _otableauposte_id, _oreference_id) {

    var nttcomptebalancedetails = [],
      DetailCount = 0,
      TotalSoldeDebit = 0,
      TotalSoldeCredit = 0;


    this.addBalanceDetail = function (objdata) {
      nttcomptebalancedetails.push(
        {
         // "nttCompteBalanceId": objdata.nttCompteBalanceId,
          "NumCompte": objdata.NumCompte,
          "IntitulCompte": objdata.IntitulCompte,
          "SoldeDebit": objdata.SoldeDebit,
          "SoldeCredit": objdata.SoldeCredit
        }



      );

      TotalSoldeDebit += objdata.SoldeDebit;
      TotalSoldeCredit += objdata.SoldeCredit;
      DetailCount = nttcomptebalancedetails.length;

      return {
        TotalSoldeDebit: TotalSoldeDebit,
        TotalSoldeCredit: TotalSoldeCredit,
        DetailCount: DetailCount,
      };
    };



    this.hasitem = function (obj) {
      return nttcomptebalancedetails.indexOf(obj) !== -1;

    };

    this.removeItem = function (obj) {
      var itemIndex = nttcomptebalancedetails.indexOf(obj);
      if (itemIndex !== -1) {
        nttcomptebalancedetails.splice(itemIndex, 1);
      }
    };

    this.getData = function () {
      return {
        'Id': this.id,
        '_oexerccompta_id': _oexerccompta_id,
        '_otableauposte_id': _otableauposte_id,
        '_oreference_id': _oreference_id,
        'totalSoldeDebit': TotalSoldeDebit,
        'totalSoldeCredit': TotalSoldeCredit,
        'DetailCount': DetailCount,
        'nttcomptebalancedetails': this.nttcomptebalancedetails.slice()
      };
    };

  };

  return {
    nttCompteBalance: nttCompteBalance

  };
})();

module.exports = {
  nttCompteBalance: ohaCompteBalance.nttCompteBalance
};
 */
/*
//Test the constructor at the console prompt:
var nttcomptebalance = new ohaCompteBalance.nttCompteBalance(2, 87, 2007, 1)
nttcomptebalance.addBalanceDetail(0, 2, "58520", "Mensah", 90000, 0)
nttcomptebalance.addBalanceDetail(0, 2, "456200", "Mensah1", 1500000, 0)
console.log(nttcomptebalance.getData())
console.log(nttcomptebalance.getData().TotalSoldeDebit)
console.log(nttcomptebalance.getData().TotalSoldeCredit)
*/


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
require('../config/ohadb').connectserver()
var Models = require('../omodels');

const objdata= require('./odaCompteBalanceData').CompteBalanceData


