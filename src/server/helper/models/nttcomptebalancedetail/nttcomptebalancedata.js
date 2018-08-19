var odaCompteBalanceData = (function () {
  "use strict";
// User data

  var nttcomptebalanceData =
  {
        "CreatedOn": "2018-07-08T23:28:46.024Z",
        "ModifiedOn": "2018-07-08T23:59:43.326Z",
        "_id": "5b429e2e23e3712a2c4c8a1d",
        "_oexerccompta_id": "5aee0f0023b8a2227003e7b0",
        "_otableauposte_id": "5aee0eff23b8a2227003e7aa",
        "_oreference_id": "5aee0efe23b8a2227003e6ef",
        "CreatedBy": "Admin",
        "ModifiedBy": "Admin",
        "__v": 0,
        "nttcomptebalancedetails": [
            {
                "CreatedOn": "2018-07-08T23:59:43.351Z",
                "ModifiedOn": "2018-07-08T23:59:43.351Z",
                "_id": "5b42a56fa0174e1648fc7305",
                "_nttcomptebalance_id": "5b429e2e23e3712a2c4c8a1d",
                "NumCompte": "545454",
                "IntitulCompte": "efoevi",
                "SoldeDebit": 65643312,
                "SoldeCredit": 0,
                "CreatedBy": "Admin",
                "ModifiedBy": "Admin",
                "__v": 0,
                "id": "5b42a56fa0174e1648fc7305"
            },
            {
                "CreatedOn": "2018-07-08T23:59:43.350Z",
                "ModifiedOn": "2018-07-08T23:59:43.350Z",
                "_id": "5b42a56fa0174e1648fc7304",
                "_nttcomptebalance_id": "5b429e2e23e3712a2c4c8a1d",
                "NumCompte": "828282",
                "IntitulCompte": "mensahvi",
                "SoldeDebit": 44829579,
                "SoldeCredit": 0,
                "CreatedBy": "Admin",
                "ModifiedBy": "Admin",
                "__v": 0,
                "id": "5b42a56fa0174e1648fc7304"
            },
               {
                "CreatedOn": "2018-07-08T23:28:46.046Z",
                "ModifiedOn": "2018-07-08T23:59:43.355Z",
                "_id": "5b429e2e23e3712a2c4c8a1e",
                "_nttcomptebalance_id": "5b429e2e23e3712a2c4c8a1d",
                "NumCompte": "969696",
                "IntitulCompte": "updateakolivi",
                "SoldeDebit": 6500000,
                "CreatedBy": "Admin",
                "ModifiedBy": "Admin",
                "__v": 0,
                "SoldeCredit": 0,
                "id": "5b429e2e23e3712a2c4c8a1e"
            },
              {
                "IntitulCompte": "Mensah",
                "NumCompte": "999999",
                "SoldeCredit": 18808451
              },
            {
              "IntitulCompte": "efoe",
              "NumCompte": "888888",
              "SoldeCredit": 18808451
            }
        ],
        "id": "5b429e2e23e3712a2c4c8a1d"

}

        return {
          nttcomptebalanceData: nttcomptebalanceData
        };

      })();
      module.exports = {
        CompteBalanceData: odaCompteBalanceData.nttcomptebalanceData
      };
