"use strict"

var Models = require('../../omodels');
var async = require('async');

function BuildnttCompteBalance(model, body) {
  // let nttcomptebalancedetails=[];
  var comptebalance = new model(
    {
      '_oexerccompta_id': body._oexerccompta_id,
      '_otableauposte_id': body._otableauposte_id,
      '_oreference_id': body._oreference_id
    });

  body.nttcomptebalancedetails.forEach(function (entry) {
    comptebalance.addBalanceDetail({
      "_nttcomptebalance_id": comptebalance._id,
      "NumCompte": entry.NumCompte,
      "IntitulCompte": entry.IntitulCompte,
      "SoldeDebit": entry.SoldeDebit,
      "SoldeCredit": entry.SoldeCredit
    })

  });
  return comptebalance;
}

function toInitializeInstance(model, body) {
  var balance = BuildnttCompteBalance(model, body)
  return {
    balance: balance,
    getData: balance.getData()
  }

}

function searchBy(model, comptebalance) {
  var getquery = model.findOne({ _id: comptebalance }, {})
  return getquery;
}


function toCompteBalanceDetail(model, body) {

  return new model(
    {
      nttcomptebalance_id: body.nttcomptebalance_id,
      IntitulCompte: body.IntitulCompte,
      SoldeDebit: body.SoldeDebit,
      SoldeCredit: body.SoldeCredit

    });
}


module.exports = {
  index: function (callback) {
    Models.nttCompteBalanceDetail.find({}, {}, { limit: 5, sort: { 'CreatedOn': -1 } },
      function (err, nttcomptebalancedetails) {
        var attachCompteBalance = function (nttcomptebalancedetail, next) {
          Models.nttCompteBalance.findOne({ _id: nttcomptebalancedetail._nttcomptebalance_id },
            function (err, nttcomptebalance) {
              if (err) throw err;

              nttcomptebalancedetail.nttcomptebalance = nttcomptebalance;
              next(err);
            });
        };

        async.each(nttcomptebalancedetails, attachCompteBalance,
          function (err) {

            if (err) throw err;
            callback(null, nttcomptebalancedetails);
          });
      });

  },

  DetailExists: function (model, _comptebalance, callback) {
    model.find({ _nttcomptebalance_id: _comptebalance }, {},
      function (err, details) {
        if (err) {
          return (err)
        } else {

          setTimeout(function () {

            return callback(null, details.length);
          }, 200);
        }


      })

  },

  create: function (model, modelitem, requestparameter, body, callback) {
    var _arrDetails = [];
    searchBy(model, requestparameter, function (err, nttcomptebalance) {

      if (!err && nttcomptebalance) {
        var objdetail = new modelitem({
          "_nttcomptebalance_id": nttcomptebalance._id,
          "NumCompte": body.NumCompte,
          "IntitulCompte": body.IntitulCompte,
          "SoldeDebit": body.SoldeDebit,
          "SoldeCredit": body.SoldeCredit

        });
        _arrDetails.push(objdetail);

        async.eachSeries(

          _arrDetails,

          function (objdetail, detailSavedCallBack) {

            objdetail.save(function (err) {

              if (err) {
                return (new Error({
                  error: 'Error inserting new record.'
                }));

              }

              detailSavedCallBack();
            });

          },

          function (err) {

            if (err)
              return (err);
            setTimeout(function () {

              return callback(null, 'Details entered successfully');
            }, 200);




            //   nttbalanceSavedCallBack();
          });


      }

      setTimeout(function () {

        return callback(null, nttcomptebalance);
      }, 200);
    });

  },

  createbalancedetails: function (model, modeldetail, body, callback) {

    var obj = toInitializeInstance(model, body);
    // var _comptebalance = obj.balance;
    var _getdata = obj.getData;
    var _comptedetails = [],
      _arrDetails = [];
    _comptedetails = _getdata.nttcomptebalancedetails;

    for (var i = 0; i < _comptedetails.length; i++) {
      var objdetail = new modeldetail(_comptedetails[i]);

      _arrDetails.push(objdetail);
    }
    async.eachSeries(

      _arrDetails,

      function (objdetail, detailSavedCallBack) {

        objdetail.save(function (err) {

          if (err) {
            return (new Error({
              error: 'Error inserting new record.'
            }));

          }

          detailSavedCallBack();
        });

      },

      function (err) {

        if (err)
          return (err);
        setTimeout(function () {

          return callback(null, 'Details entered successfully');
        }, 200);




        //   nttbalanceSavedCallBack();
      });

  },

  createComptebalanceDetail: function (model, body, callback) {
    var arr = [];

    var obj = toCompteBalanceDetail(model, body);
    /*  if (!((body.NumCompte && body.IntitulCompte && body.SoldeDebit
         && body.SoldeDebit > 0) ||
         (body.NumCompte && body.IntitulCompte && body.SoldeCredit
           && body.SoldeCredit > 0)))*/

    arr.push(obj);

    async.eachSeries(arr, function (balanceinput, SavedCallBack) {
      balanceinput.save(function (err) {
        if (err) {
          if (err.code === 11000) {
            //  return SavedCallBack(err)
            return (new Error({
              error: 'Error  inserting duplicate key.'
            }));
          }
          else {
            //  return SavedCallBack(err)
            return (new Error({
              error: 'Error inserting new record.'
            }));
          }
        }
        else {

          SavedCallBack();
          //  return SavedCallBack(err)
        }
      });
    }, function (err, balanceinput) {
      if (err)
        return (err);
      setTimeout(function () {

        return callback(null, balanceinput);
      }, 200);
    });
  },


};
