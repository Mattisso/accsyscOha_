//var path = require('path');
//var Models = require(path.join(__dirname,'../omodels/index'));
"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

//var Models= require('../omodels').nstBalanceInput
//console.log(Models)

//console.log(oo.connectserver())
require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var Models = require('../omodels');
var odahelper = require('../helper');


 function insertnttBalance (callback) {
  var _nttbalances = [],
  compteData ={},
  details=[];

  var objnstbalance = new Models.nttCompteBalance(
    {
     '_oexerccompta_id': compteData._oexerccompta_id,
      _otableauposte_id: compteData._otableauposte_id,
      _oreference_id: compteData._oreference_id,

    }
  )

  _.forEach(details, function (obj) {

    var objnstbalance = new Models.nttCompteBalanceDetail(
        {
         _nttcomptebalance_id: objnstbalance._id,
          IntitulCompte: obj.IntitulCompte,
        NumCompte: obj.NumCompte,
        SoldeDebit: obj.SoldeDebit,
        SoldeCredit: obj.SoldeCredit
        }
    )
    _nttbalances.push(objnstbalance);

    //    callback(JSON.stringify(nstbalanceinputdata))

});
}
