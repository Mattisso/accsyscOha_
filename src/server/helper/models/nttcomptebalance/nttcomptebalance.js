"use strict";
//var async = require('async');
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var objQueriesParams = require('../../objQueriesParams')
var nttCompteBalanceView = require('./nttCompteBalanceView')

//var _createcompte= require('../createcomptebalance');
var Models = require('../../../omodels')

var nttcomptebalance = (function () {

  var searchBy =function (requestBody, callback) {
    var qy = selector(requestBody)
//console.log(qy);
    Models.nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else {
          var qyrparm = requestBody._id
  //        console.log(qyrparm)
          Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err
              }
              else {
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails

                callback(null, nttcomptebalance);

              }
            })

        }
      })




  }

  var compteBalanceExists = function (paramId) {
  var reqparamid= objQueriesParams.getid(paramId)
  var getquery = Models.nttCompteBalance.findOne(reqparamid, {})
    .populate('nttcomptebalancedetails')
  return getquery;
}
  var comptebalance = null;



  function BuildnttCompteBalance(body) {




comptebalance = new Models.nttCompteBalance(
  {
    '_oexerccompta_id':  body._oexerccompta_id,
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

     // console.log(viewModel)


    // let nttcomptebalancedetails=[];

    return comptebalance;
  }


  function BuildupdateCompteBalance(body) {
    // let nttcomptebalancedetails=[];
    comptebalance = body;
    return comptebalance;
  }



  function toInitializeInstance(body) {
    var balance = BuildnttCompteBalance(body)
    return {
      balance: balance,
      getData: balance.getData()
    }

  }


  function toCompteBalanceDetail(requestparamid, body) {

    return new Models.nttCompteBalanceDetail(
      {
        _nttcomptebalance_id: requestparamid,
        IntitulCompte: body.IntitulCompte,
        SoldeDebit: body.SoldeDebit,
        SoldeCredit: body.SoldeCredit

      });
  }



  function queryselector(requestBody) {
    var selector = false

    if ((requestBody._oexerccompta_id !== undefined && requestBody._oexerccompta_id !== null)
    && (requestBody._otableauposte_id !== undefined && requestBody._otableauposte_id !== null)
     && (requestBody._oreference_id !== undefined && requestBody._oreference_id !== null)) {

      selector = true
    }
    else {
      selector = false

    }
    return selector;
  }


  function selector(requestBody) {
    var queryselector;

    if ((requestBody._oexerccompta_id !== undefined &&  requestBody._oexerccompta_id !== null)
    && (requestBody._otableauposte_id === undefined || requestBody._otableauposte_id === null)
     && (requestBody._oreference_id === undefined || requestBody._oreference_id === null)) {
      queryselector = {
        '$and': [
          { '_oexerccompta_id': requestBody._oexerccompta_id }

        ]
      }
    }
    else if ((requestBody._oexerccompta_id !== undefined && requestBody._oexerccompta_id !== null)
    && (requestBody._otableauposte_id !== undefined && requestBody._otableauposte_id !== null)
    && (requestBody._oreference_id === undefined || requestBody._oreference_id === null)){

      queryselector = {
        '$and': [
          { '_oexerccompta_id': requestBody._oexerccompta_id },
          { '_otableauposte_id': requestBody._otableauposte_id }
        ]
      }
    }

   else   if ((requestBody._oexerccompta_id !== undefined && requestBody._oexerccompta_id !== null)
      && (requestBody._otableauposte_id !== undefined && requestBody._otableauposte_id !== null)
       && (requestBody._oreference_id !== undefined && requestBody._oreference_id !== null)) {

      queryselector = {
        '$and': [
          { '_oexerccompta_id': requestBody._oexerccompta_id },
          { '_otableauposte_id': requestBody._otableauposte_id },
          { '_oreference_id': requestBody._oreference_id }
        ]
      }
    }
    else {
      queryselector = {};

    }
    return queryselector;
  }


  function toUpdateCompteBalance(result, requestparamid, requestBody) {
    var d = new Date();
   // result = result || {};
//requestBody = requestBody || {};
var obj=requestBody.CompteBalanceData;

    result._id = requestparamid,
      result._oexerccompta_id = obj._oexerccompta_id,
      result._otableauposte_id = obj._otableauposte_id,
      result._oreference_id = obj._oreference_id
    result.ModifiedOn = d;
    return result;
  }




  function log(detail) {
    if (comptebalance !== null) {
      comptebalance.addBalanceDetail(detail);
      nttCompteBalanceView.render(comptebalance);
      return "Thanks for logging your Detail.";
    }
    else {
      return "Please wait for user details to load.";
    }

  }
  function init() {
    return {
      log: log,
      toInitializeInstance: toInitializeInstance,
      BuildupdateCompteBalance: BuildupdateCompteBalance,
      toCompteBalanceDetail: toCompteBalanceDetail,
      toUpdateCompteBalance: toUpdateCompteBalance,
      selector: selector,
      queryselector: queryselector,
      compteBalanceExists:compteBalanceExists,
      searchBy:searchBy

    };

  }

  return {
    init: init
  }

})();

module.exports = {
  init: nttcomptebalance.init
}
