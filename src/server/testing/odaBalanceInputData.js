
  // User data
var odaBalanceInputData = (function () {
  "use strict";

  var balanceinputData =[ { "NumCompte": "102010",
  "IntitulCompte": "Dotation BENIN",
  "SoldeCredit": 44829579 },
{ "NumCompte": "102020",
  "IntitulCompte": "Dotation BURKINA",
  "SoldeCredit": 65643312 },
{ "NumCompte": "102040",
  "IntitulCompte": "Dotation CENTRAFRIQUE",
  "SoldeCredit": 41326938 },
{ "NumCompte": "102050",
  "IntitulCompte": "Dotation COTE D'IVOIRE",
  "SoldeCredit": 64842784 },
{ "NumCompte": "4196200",
  "IntitulCompte": "Collectif Loyers, Burkina",
  "SoldeCredit": 472838 }]


  return {
    balanceinputData: balanceinputData
  };

})();
module.exports = {
  balanceinputData: odaBalanceInputData.balanceinputData
};






// 5ad3c054af2f1c1a5075a4fd	5ad3c053af2f1c1a5075a4fa	5ad3c052af2f1c1a5075a458


/*var nttcomptebalance = odaBalanceInputData();
//var nttcomptebalance = BuildnttCompteBalance(nttCompteBalanceData);
console.log(nttcomptebalance);
*/
//console.log(odaBalanceInputData.nttcomptebalanceData(nttcomptebalanceData));

//console.log(nttcomptebalance.addBalanceDetail(0, 1, "707000", "IamTired", 660000, 0, "ObjectState"));
