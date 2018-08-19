"use strict"

//var Models = require('../../omodels');
var async = require('async');
var objQueriesParams = require('../../objQueriesParams')

var nttCompteBalance = require('../../../omodels').nttCompteBalance;
var nttCompteBalanceDetail = require('../../../omodels').nttCompteBalanceDetail;

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
/*
function toInitializeInstance(model, body) {
  var balance = BuildnttCompteBalance(model, body)
  return {
    balance: balance,
    getData: balance.getData()
  }

}*/


module.exports = {
  index: function (callback) {

    nttCompteBalance.find({}, {}, { limit: 2 },
      function (err, nttcomptebalances) {
        if (err) {
          throw err;
        }
        else {
          async.eachSeries(nttcomptebalances, function (nttcomptebalance, nttcomptecallback) {
            var qyrparm = nttcomptebalance._id
            nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
              function (err, nttcomptebalancedetails) {
                if (err) throw err;
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails
                nttcomptecallback();

              })

          }, function (err) {

            if (err) {
              throw err;
            }
            else {
              callback(null, nttcomptebalances);
            }
          }
          )
        }
      })
  },

  getById: function (paramId, callback) {

    nttCompteBalance.findById(paramId, {})
      .populate('nttcomptebalancedetails')
      .exec(function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else {


          callback(null, nttcomptebalance);
        }

      })
  },



  searchForDuplicate: function (body, callback) {

    var qy = {
      '$and': [

        {
          '_oexerccompta_id': body._oexerccompta_id
        },
        {
          '_otableauposte_id': body._otableauposte_id
        }, {
          '_oreference_id': body._oreference_id
        }
      ]
    }

    nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else if (!nttcomptebalance || nttcomptebalance == null) {
          callback(null, null)
        }
        else {
          var qyrparm = nttcomptebalance._id
          nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err
              }
              else {
                // mergeoreference.nttcomptebalance= nttcomptebalance,
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails

                callback(null, JSON.stringify(nttcomptebalance));

              }
            })

        }
      })

  },


  searchBy: function (selectedByYear = null, selectedByOtableauPoste = null, selectedByOrefence = null, callback) {
    if (selectedByYear !== undefined && selectedByYear !== null
      && selectedByOtableauPoste == null
      && selectedByOrefence == null) {
      var qy = objQueriesParams.getExerccomptaid(selectedByYear)
      nttCompteBalance.findOne(qy, {},
        function (err, nttcomptebalance) {
          if (err) {
            throw err;
          }
          else {
            var qyrparm = nttcomptebalance._id
            nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
              function (err, nttcomptebalancedetails) {
                if (err) {
                  throw err
                }
                else {
                  // mergeoreference.nttcomptebalance= nttcomptebalance,
                  nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails

                  callback(null, JSON.stringify(nttcomptebalance));

                }
              })

          }
        })



    }
  },
  toInitializeInstance: function (model, body) {
    var balance = BuildnttCompteBalance(model, body)
    return {
      balance: balance,
      getData: balance.getData()
    }

  }
  ,
/*
  createModel: function (body, callback) {
    var obj = toInitializeInstance(nttCompteBalance, body);
    var _comptebalance = obj.balance;
    var _getdata = obj.getData;
    var _comptedetails = [],
      _arrDetails = [];
    _comptedetails = _getdata.nttcomptebalancedetails;

    for (var i = 0; i < _comptedetails.length; i++) {
      var objdetail = new nttCompteBalanceDetail(_comptedetails[i]);

      _arrDetails.push(objdetail);
    }



    if (!(_comptebalance._oexerccompta_id && _comptebalance._otableauposte_id && _comptebalance._oreference_id
    )) {
      return (new Error({
        error: ' error There was an error!'
      }));

    } else {

      _comptebalance.save(function (err, result) {

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

          console.log(result)
          //  return SavedCallBack(err)
        }

        // callback(JSON.stringify(nstbalanceinputdata))


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
          }
        );

      });

      // nttbalanceSavedCallBack();

    }
  },
*/
  edit: function(body, callback) {


    callback(null,null)

  }

}
