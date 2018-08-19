"use strict";
//var async = require('async');
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var objqueriesparams = require('../../objQueriesParams')

var nttCompteBalanceViewEnhanced = require('./nttCompteBalanceViewEnhanced')

var Models = require('../../../omodels');
//var nttCompteBalanceDetail = require('../../../omodels/index').nttCompteBalanceDetail;
var comptebalancedata = require('./nttcomptebalance')



var nttcomptebalancedetail = (function () {



function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}


  var comptebalance = null;

  function BuildnttCompteBalance(body) {
    // let nttcomptebalancedetails=[];
    var comptebalance = new Models.nttCompteBalance(
      {
        '_oexerccompta_id': body._oexerccompta_id,
        '_otableauposte_id': body._otableauposte_id,
        '_oreference_id': body._oreference_id
      });

    body.nttcomptebalancedetails.forEach(function (entry) {
      comptebalance.addBalanceDetail({
        "_nttcomptebalance_id": comptebalance._id,
        "NumCompte": entry.NumCompte,
        "IntitulCompte": entry.IntitulCompte,
        "SoldeDebit": entry.SoldeDebit,
        "SoldeCredit": entry.SoldeCredit
      })

    });
    return comptebalance;
  }

  function updatenttCompteBalanceFromData(body) {
    comptebalance = BuildnttCompteBalance(body);
    nttCompteBalanceViewEnhanced.render(comptebalance);
  }




  function loadCompteBalance(body) {
    comptebalancedata.getById(body, updatenttCompteBalanceFromData);
    return "Loading user details...";
  }
  /*
      function PostnttCompteBalance() {
  if (!((body.NumCompte && body.IntitulCompte && body.SoldeDebit
           && body.SoldeDebit > 0) ||
           (body.NumCompte && body.IntitulCompte && body.SoldeCredit
             && body.SoldeCredit > 0)))

          comptebalanceManagement.prototype.sendCompteBalance();
        //  OhadaApp.data.Insert(obj,loadnttCompteBalanceFromData);
        //      return "Loading user details...";
          }
  */



  function queryselector(requestBody) {

    var selector;

    if ((requestBody.NumCompte !== undefined && requestBody.NumCompte !== null)
      && (requestBody.IntitulCompte !== undefined && requestBody.IntitulCompte !== null)
      && (requestBody.SoldeDebit !== undefined && requestBody.SoldeDebit > 0) ||
      (requestBody.NumCompte !== undefined && requestBody.NumCompte !== null)
      && (requestBody.IntitulCompte !== undefined && requestBody.IntitulCompte !== null)
      && (requestBody.SoldeCredit !== undefined && requestBody.SoldeCredit > 0)
    ) {

      selector = true
    }
    else {
      selector = false

    }
    return selector;
  }


  function toCompteBalanceDetail(requestparamid, requestBody) {
    var isvalid = queryselector(requestBody);
    if (isvalid === true) {
      return new Models.nttCompteBalanceDetail(
        {
          _nttcomptebalance_id: requestparamid,
          NumCompte: requestBody.NumCompte,
          IntitulCompte: requestBody.IntitulCompte,
          SoldeDebit: requestBody.SoldeDebit ? requestBody.SoldeDebit : 0,
          SoldeCredit: requestBody.SoldeCredit ? requestBody.SoldeCredit : 0,

        });

    } else {
      console.log('please  check for missing value')
    }

  }
/*

  function hasItem (item) {
  return items.indexOf(item) !== -1;
  }

  function removeItem (item) {
  var itemIndex = items.indexOf(item);
  if (itemIndex !== -1) {
  items.splice(itemIndex, 1);
  }
  }*/


  function toUpdateCompteBalanceDetail(result, requestparamid, requestBody) {
    var d = new Date();
   // result = result || {};
//requestBody = requestBody || {};

    result._nttcomptebalance_id = requestparamid,
      result.NumCompte = requestBody.NumCompte,
      result.IntitulCompte = requestBody.IntitulCompte,
      result.SoldeDebit = requestBody.SoldeDebit ? requestBody.SoldeDebit : 0,
      result.SoldeCredit = requestBody.SoldeCredit ? requestBody.SoldeCredit : 0,
      result.ModifiedOn = d;
    return result;
  }


  function log(detail) {
    if (comptebalance !== null) {
      comptebalance.addBalanceDetail(detail);
      nttCompteBalanceViewEnhanced.render(comptebalance);
      return "Thanks for logging your Detail.";
    }
    else {
      return "Please wait for user details to load.";
    }

  }
  function toinit() {

    return {
      log: log,
      loadCompteBalance: loadCompteBalance,
      toCompteBalanceDetail: toCompteBalanceDetail,
      toUpdateCompteBalanceDetail: toUpdateCompteBalanceDetail,
      DetailExists:DetailExists
      //   queryselector:queryselector

    };

  }


  return {
    toinit: toinit
  }


})();

module.exports = {
  toinit: nttcomptebalancedetail.toinit
}

/* Further Adventures




  function toUpdateCompteBalanceDetail(result, requestparamid, requestBody) {
    var d = new Date();
    result = result || {};
    requestBody = requestBody || {};

    result._nttcomptebalance_id = requestparamid,
      result.NumCompte = requestBody.NumCompte,
      result.IntitulCompte = requestBody.IntitulCompte,
      result.SoldeDebit = requestBody.SoldeDebit ? requestBody.SoldeDebit : 0,
      result.SoldeCredit = requestBody.SoldeCredit ? requestBody.SoldeCredit : 0,
      result.ModifiedOn = d;
    return result;
  }



  function toinit() {
    return {
      //  toCreateComptebalancedetail:toCreateComptebalancedetail,
      toCompteBalanceDetail: toCompteBalanceDetail,
      toNsbalanceinput: toNsbalanceinput,
      toUpdateCompteBalanceDetail: toUpdateCompteBalanceDetail,
      toUpdateCompteBalance: toUpdateCompteBalance,
      selector: selector,
      queryselector:queryselector
    }
  }
  return {
    toinit: toinit
  }

})();
module.exports = {
  toinit: toInitializeInstance.toinit
}

  The nttComptBalance constructor and comptebalance view
  code have been imported on the
 HTML panel.
  The comptebalance data needs a name and
 a sessions array.

 1) Run the program.

  2) At the console, create some
     comptebalance data:

    var Data = {
  Id: 1,
   oReferenceId: 87,
   oExercComptaId: 2006,
   oTableauPosteId: 1, nttCompteBalanceDetails: []}

  3) Initialize the fitness app
     with the data:

     var comptebalance = fitnessApp.init(Data)

  4) Log a session:

     comptebalance.log(0, 1, "707000", "IamTired", 660000, 0, ObjectState.Added)

 */
