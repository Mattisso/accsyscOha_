var createcomptebalancedata = (function () {
  "use strict";
  // User data

  var nttcomptebalanceData =
  {
    "object": "nttcomptebalances:",
    "CompteBalanceData": {
      "CreatedOn": "2018-07-04T22:19:57.529Z",
      "ModifiedOn": "2018-07-04T22:19:57.529Z",
      "_id": "5b3d480d155a50132887f272",
      "_oexerccompta_id": "5aee0f0023b8a2227003e7b0",
      "_otableauposte_id": "5aee0eff23b8a2227003e7aa",
      "_oreference_id": "5aee0efe23b8a2227003e6fe",
      "CreatedBy": "Admin",
      "ModifiedBy": "Admin",
      "__v": 0,
      "nttcomptebalancedetails": [
        {
          "CreatedOn": "2018-07-04T22:20:01.643Z",
          "ModifiedOn": "2018-07-04T22:20:01.643Z",
          "_id": "5b3d4811155a50132887f273",
          "_nttcomptebalance_id": "5b3d480d155a50132887f272",
          "NumCompte": "767676",
          "IntitulCompte": "NinivieUpdate",
          "SoldeDebit": 4400000,
          "CreatedBy": "Admin",
          "ModifiedBy": "Admin",
          "__v": 0,
          "id": "5b3d4811155a50132887f273"
        },
        {
          "CreatedOn": "2018-07-04T22:20:01.644Z",
          "ModifiedOn": "2018-07-04T22:20:01.644Z",
          "_id": "5b3d4811155a50132887f274",
          "_nttcomptebalance_id": "5b3d480d155a50132887f272",
          "NumCompte": "969696",
          "IntitulCompte": "akoliviUpdate",
          "SoldeDebit": 6500000,
          "CreatedBy": "Admin",
          "ModifiedBy": "Admin",
          "__v": 0,
          "id": "5b3d4811155a50132887f274"
        },
        {

          "IntitulCompte": "mensahvi",
          "NumCompte": "828282",
          "SoldeDebit": 44829579,

        },
        {

          "IntitulCompte": "efoevi",
          "NumCompte": "545454",
          "SoldeDebit": 65643312
        }
      ],
      "id": "5b3d480d155a50132887f272"
    }
  }
  return {
    nttcomptebalanceData: nttcomptebalanceData
  };

})();
module.exports = {
  CompteBalanceData: createcomptebalancedata.nttcomptebalanceData
};
