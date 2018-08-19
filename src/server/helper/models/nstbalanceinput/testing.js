/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */




//var async = require('async')
require('../../../config/ohadb').connectserver()
var  objdata = require('../../data/balanceinputdata')
var dataservice = require('./nstbalanceinput')
 var nstBalanceInput = require('../../../omodels').nstBalanceInput;
// var _ = require('lodash')

function testing() {
  //  var obj=JSON.stringify(objdata)
  //  console.log(obj)

  var obj1 = {};

  obj1 = dataservice.init(nstBalanceInput,objdata)
   /* obj1 = dataservice.init({
      "NumCompte": "822000",
      "IntitulCompte": "Produits Cessions Immo. Corp.",
      "SoldeCredit": 500000
    }),
    obj1 = dataservice.init({
      "NumCompte": "83100",
      "IntitulCompte": "Charges Hors Activ. Ordin.",
      "SoldeDebit": 2322000
    }),
    obj1 = dataservice.init({
      "NumCompte": "83100",
      "IntitulCompte": "Charges Hors Activ. Ordin.",
      "SoldeDebit": 2322000
    }),
    obj1 = dataservice.init({
      "NumCompte": "83100",
      "IntitulCompte": "Charges Hors Activ. Ordin.",
      "SoldeDebit": 2322000
    })*/
  return obj1;

}
/*
function testing() {
  var obj1 = dataservice.init(objdata);
  return obj1;

}
*/
/*
function testing() {
    //  var obj=JSON.stringify(objdata)
    //  console.log(obj)
    var arr=[],
    _arr=[];
   async.forEach(objdata, function(entry) {
  var   obj1= dataservice.init(entry)

  arr.push(obj1)

   })

   for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
}
_arr.push(obj)
return _arr;;

}
*/
console.log(JSON.stringify(testing()))
