var createcomptebalancedata = (function () {
  "use strict";
  // User data

  var nttcomptebalanceData =
  {
    "object": "nttcomptebalances:",
    "CompteBalanceData": {
      "CreatedOn": "2018-07-07T00:10:20.780Z",
      "ModifiedOn": "2018-07-07T00:10:20.780Z",
      "_id": "5b4004ec9e942f2bd000dbe9",
      "_oexerccompta_id": "5aee0f0023b8a2227003e7b0",
      "_otableauposte_id": "5aee0eff23b8a2227003e7aa",
      "_oreference_id": "5aee0efe23b8a2227003e6ef",
      "CreatedBy": "Admin",
      "ModifiedBy": "Admin",
      "__v": 0,
      "nttcomptebalancedetails": [{
          "CreatedOn": "2018-07-07T00:10:24.890Z",
          "ModifiedOn": "2018-07-07T00:10:24.890Z",
          "_id": "5b4004f09e942f2bd000dbea",
          "_nttcomptebalance_id": "5b4004ec9e942f2bd000dbe9",
          "NumCompte": "767676",
          "IntitulCompte": "UpdateNinivie",
          "SoldeDebit": 44829579,
          "CreatedBy": "Admin",
          "ModifiedBy": "Admin",
          "__v": 0,
          "id": "5b4004f09e942f2bd000dbea"
        }, {
          "CreatedOn": "2018-07-07T00:10:24.890Z",
          "ModifiedOn": "2018-07-07T00:10:24.890Z",
          "_id": "5b4004f09e942f2bd000dbeb",
          "_nttcomptebalance_id": "5b4004ec9e942f2bd000dbe9",
          "NumCompte": "969696",
          "IntitulCompte": "updateakolivi",
          "SoldeDebit": 65643312,
          "CreatedBy": "Admin",
          "ModifiedBy": "Admin",
          "__v": 0,
          "id": "5b4004f09e942f2bd000dbeb"
        },          {

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
      "id": "5b4004ec9e942f2bd000dbe9"
    }
  }

  return {
    nttcomptebalanceData: nttcomptebalanceData
  };

})();
module.exports = {
  CompteBalanceData: createcomptebalancedata.nttcomptebalanceData
};
