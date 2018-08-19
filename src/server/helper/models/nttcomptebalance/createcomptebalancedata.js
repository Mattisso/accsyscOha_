var createcomptebalancedata = (function () {
  "use strict";
  // User data

  var nttcomptebalanceData =

    {
      "_oexerccompta_id": "5aee0f0023b8a2227003e7b0",
      "_otableauposte_id": "5aee0eff23b8a2227003e7ad",
      "_oreference_id": "5aee0efe23b8a2227003e70b",

      "nttcomptebalancedetails": [
        {

          "IntitulCompte": "Dotation BENIN",
          "NumCompte": "102010",
          "SoldeDebit": 0,
          "SoldeCredit": 44829579,

        },
        {

          "IntitulCompte": "Dotation BURKINA",
          "NumCompte": "102020",
          "SoldeDebit": 0,
          "SoldeCredit": 65643312,

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
