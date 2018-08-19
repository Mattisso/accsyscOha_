var odaCompteBalanceData = (function () {
  "use strict";
// User data

  var nttcomptebalanceData = {


    "_oexerccompta_id": '5adcf3ac21540d1de82b4d90',
    "_otableauposte_id": '5adcf3ab21540d1de82b4d8a',
    "_oreference_id": '5adcf3aa21540d1de82b4cd2',
    "nttcomptebalancedetails": [
      {
        "NumCompte": "4520",
        "IntitulCompte": "my testAgain",
        "SoldeDebit": 1520000,
        "SoldeCredit": 0
      },

      {

        "NumCompte": "4850",
        "IntitulCompte": "my Akoli",
        "SoldeDebit": 1500000,
        "SoldeCredit": 0
      }
    ]
  };
  return {
    nttcomptebalanceData: nttcomptebalanceData
  };

})();
module.exports = {
  CompteBalanceData: odaCompteBalanceData.nttcomptebalanceData
};






// 5ad3c054af2f1c1a5075a4fd	5ad3c053af2f1c1a5075a4fa	5ad3c052af2f1c1a5075a458


/*var nttcomptebalance = odaCompteBalanceData();
//var nttcomptebalance = BuildnttCompteBalance(nttCompteBalanceData);
console.log(nttcomptebalance);
*/
//console.log(odaCompteBalanceData.nttcomptebalanceData(nttcomptebalanceData));

//console.log(nttcomptebalance.addBalanceDetail(0, 1, "707000", "IamTired", 660000, 0, "ObjectState"));
