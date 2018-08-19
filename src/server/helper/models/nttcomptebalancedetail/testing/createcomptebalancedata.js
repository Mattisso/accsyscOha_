var createcomptebalancedata = (function () {
  "use strict";
  // User data

  var nttcomptebalanceData =

    {
      "_oexerccompta_id": "5aee0f0023b8a2227003e7b0",
     "_otableauposte_id": "5aee0eff23b8a2227003e7aa",
      "_oreference_id":  "5aee0efe23b8a2227003e6ef",

      "nttcomptebalancedetails": [
        {
          "IntitulCompte": "Ninivie",
          "NumCompte": "767676",
          "SoldeDebit": 44829579

        },
        {

          "IntitulCompte": "akolivi",
          "NumCompte": "969696",
          "SoldeDebit": 65643312
        }
      ]

    }
  return {
    nttcomptebalanceData: nttcomptebalanceData
  };

})();
module.exports = {
  CompteBalanceData: createcomptebalancedata.nttcomptebalanceData
};
