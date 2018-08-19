
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */


var objQueriesParams = (function () {

  var getcompteNumber = function (value) {
    if (value !== undefined && value !== null) {
      return { CompteNumber: value }
    }

  };

  var wrapValue = function (n) {
    var localVariable = n;
    return function() { return localVariable; };
    }

  var getObjectBy= function (objkey,value) {


    if (objkey !== undefined && value !== null)
    var fieldprop= wrapValue(objkey);
    console.log(fieldprop)

    return { fieldprop :value}
  };


  var getnumcompte = function (_numcompte) {
    if (_numcompte !== undefined && _numcompte !== null) {
      return { NumCompte: _numcompte }
    }

  };
  var getExerccomptaBy = function (value) {

    return { oExercComptaId: value }
  };


  var getExerccomptaid = function (value) {

    return { _oexerccompta_id: value }
  };
  var getotableauposteBy = function (value) {

    return { TableauName: value }
  };
  var getotableauposteid = function (value) {

    return { _otableauposte_id: value }
  };

  var getoreferenceBy = function (value) {

    return { RefCode: value }
  };


  var getnttcomptebalanceidBy = function (value) {

    return { _nttcomptebalance_id: value }
  };


  var getoreferenceid = function (value) {

    return { _oreference_id: value }
  };

  var getStableauNameBy = function (value) {

    return { StableauName: value }
  };

  var getAreaShortNameBy = function (value) {

    return { AreaShortName: value }
  };
  var getid = function (value) {

    return {_id: value }
  };


  return {
    getcompteNumber: getcompteNumber,
    getExerccomptaBy: getExerccomptaBy,
    getotableauposteBy: getotableauposteBy,
    getoreferenceBy: getoreferenceBy,
    getStableauNameBy: getStableauNameBy,
    getAreaShortNameBy: getAreaShortNameBy,
    getExerccomptaid: getExerccomptaid,
    getotableauposteid: getotableauposteid,
    getoreferenceid: getoreferenceid,
    getnumcompte:getnumcompte,
    getid: getid,
    getObjectBy:getObjectBy,
    getnttcomptebalanceidBy:getnttcomptebalanceidBy
  }


})();


module.exports = {
 getcompteNumber: objQueriesParams.getcompteNumber,
  getExerccomptaBy: objQueriesParams.getExerccomptaBy,
  getotableauposteBy: objQueriesParams.getotableauposteBy,
  getoreferenceBy: objQueriesParams.getoreferenceBy,
  getStableauNameBy: objQueriesParams.getStableauNameBy,
  getAreaShortNameBy: objQueriesParams.getAreaShortNameBy,
  getExerccomptaid: objQueriesParams.getExerccomptaid,
  getotableauposteid: objQueriesParams.getotableauposteid,
  getoreferenceid: objQueriesParams.getoreferenceid,
  getnumcompte: objQueriesParams.getnumcompte,
  getid:objQueriesParams.getid,
  getnttcomptebalanceid:objQueriesParams.getnttcomptebalanceidBy


  /* Getreferenceids: oshared.Getreferenceids,
    Getostblareaids:oshared.Getostblareaids,
    Getostableauposteids:oshared.Getostableauposteids,
    Getotableaupostesids:oshared.Getotableaupostesids,
    updatablance:oshared.updatablance,
    getnsbalance:oshared.getnsbalance*/
};
/*
var qry = {
  '$and': [ {
    '_xerccomptaoe_id': _oexerccompta_id
  },
  {
    '_otableauposte_id': _otableauposte_id
  }, {
    '_oreference_id': _oreference_id
  }
  ]
}
*/
