"use strict"

//var async = require('async')
var toInitializeInstance = (function () {
  function toNsbalanceinput(model, body) {

    return new model(
      {
        NumCompte: body.NumCompte,
        IntitulCompte: body.IntitulCompte,
        SoldeDebit: body.SoldeDebit,
        SoldeCredit: body.SoldeCredit

      });
  }


  function toCompteBalanceDetail(model, requestparamid, requestBody) {

    return new model(
      {
        _nttcomptebalance_id: requestparamid,
        NumCompte: requestBody.NumCompte,
        IntitulCompte: requestBody.IntitulCompte,
        SoldeDebit: requestBody.SoldeDebit ? requestBody.SoldeDebit : 0,
        SoldeCredit: requestBody.SoldeCredit ? requestBody.SoldeCredit : 0,

      });
  }

  function toUpdateCompteBalance(result, requestparamid, requestBody) {
    var d = new Date();
    result = result || {};
    requestBody = requestBody || {};

    result._id = requestparamid,
      result._oexerccompta_id = requestBody._oexerccompta_id,
      result._otableauposte_id = requestBody._otableauposte_id,
      result._oreference_id = requestBody._oreference_id
    result.ModifiedOn = d;
    return result;
  }



  function queryselector(requestBody) {
       var selector = false

      if ((requestBody._oexerccompta_id !== undefined || requestBody._oexerccompta_id !== null ) && (requestBody._otableauposte_id !== undefined && requestBody._otableauposte_id !== null ) && (requestBody._oreference_id !== undefined && requestBody._oreference_id !== null)) {

    selector=true
     }
     else {
     selector=false

     }
     return selector;
   }


  function selector(requestBody) {
    var queryselector;

    if (requestBody._oexerccompta_id !== undefined && requestBody._otableauposte_id === undefined && requestBody._oreference_id === undefined) {
      queryselector = {
        '$and': [
          {'_oexerccompta_id' : requestBody._oexerccompta_id}

        ]
      }
    }
    else if (requestBody._oexerccompta_id !== undefined && requestBody._otableauposte_id !== undefined && requestBody._oreference_id === undefined) {

      queryselector = {
        '$and': [
         { '_oexerccompta_id' : requestBody._oexerccompta_id},
         {'_otableauposte_id' : requestBody._otableauposte_id}
        ]
      }
    }
    else if (requestBody._oexerccompta_id !== undefined && requestBody._otableauposte_id !== undefined && requestBody._oreference_id !== undefined) {

      queryselector = {
        '$and': [
          {'_oexerccompta_id' : requestBody._oexerccompta_id},
         {'_otableauposte_id' : requestBody._otableauposte_id},
         {'_oreference_id' :requestBody._oreference_id}
        ]
      }
    }
    else {
      queryselector = {};

    }
    return queryselector;
  }



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
