"use strict"
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

//var Models = require('../../omodels');
var async = require('async');
var objQueriesParams = require('../objQueriesParams')

var nttCompteBalance = require('../../omodels').nttCompteBalance;
var nttCompteBalanceDetail = require('../../omodels').nttCompteBalanceDetail;
var helper = require('.')

function toUpdateCompteBalance(result, requestparamid, requestBody) {
  var d = new Date();
  result = result || {};
  requestBody = requestBody || {};

  result._id = requestparamid,
    result._oexerccompta_id = requestBody._oexerccompta_id,
    result._otableauposte_id = requestBody._otableauposte_id,
    result._oreference_id = requestBody._oreference_id
  result.ModifiedOn = d;
  return result;
}



function compteBalanceExists (paramId) {

  var getquery = nttCompteBalance.findOne(paramId, {})
    .populate('nttcomptebalancedetails')
  return getquery;
}


function BuildnttCompteBalance(requestBody) {
  // let nttcomptebalancedetails=[];
  var comptebalance = new nttCompteBalance(
    {
      '_oexerccompta_id': requestBody._oexerccompta_id,
      '_otableauposte_id': requestBody._otableauposte_id,
      '_oreference_id': requestBody._oreference_id
    });

  requestBody.nttcomptebalancedetails.forEach(function (entry) {
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

function toInitializeInstance(requestBody) {
  var balance = BuildnttCompteBalance(requestBody)
  return {
    balance: balance,
    getData: balance.getData()
  }

}


module.exports = {
  index: function (callback) {

    nttCompteBalance.find({}, {}, { limit: 5 },
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



  searchForDuplicate: function (requestBody, callback) {

    var qy = {
      '$and': [

        {
          '_oexerccompta_id': requestBody._oexerccompta_id
        },
        {
          '_otableauposte_id': requestBody._otableauposte_id
        }, {
          '_oreference_id': requestBody._oreference_id
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
  toInitializeInstance: function (requestBody) {
    var balance = BuildnttCompteBalance(requestBody)
    return {
      balance: balance,
      getData: balance.getData()
    }

  }
  ,

  createModel: function (requestBody, callback) {
    var obj = toInitializeInstance(requestBody);
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



  comptebalancedelete: function(requestparamid, callback) {
    compteBalanceExists(requestparamid)
  .exec(function (err, data) {
    if (err) {
      throw (err);

    } else {
      if (!data) {
        console.dir('not found');

      } else {
        data.remove(function (err) {
          if (!err) {
            data.remove();

          }
          else {
            console.log(err);
          }
        });

        }
      callback(null,`Successfully Deleted nstbalanceinput with compte number: ${requestparamid}`);

    }
  })

  },
  edit: function(requestBody, requestparamid, callback) {

      var obj =  requestBody.CompteBalanceData;  //helper.Nttcomptebalace.toInitializeInstance(requestBody);
    var comptenumber = objQueriesParams.getid(requestparamid);
    compteBalanceExists(comptenumber)
      .exec(function (err, data) {
        if (err) {
          throw(err);
        } else {

          if (data) {

            toUpdateCompteBalance(data,requestparamid, requestBody)
/*
            data._oexerccompta_id = obj._oexerccompta_id;
            data._otableauposte_id = obj._otableauposte_id;
            data._oreference_id = obj._oreference_id;*/

            data.save(function (err) {
              if (!err) {
                console.log('Successfully updated obj with primary number: ' + obj._id);
                data.save();
              } else {
                console.log('err on save');
              }
            });


          }
          //poulate the document with the updated values

        }
        callback(null,'Successfully updated  with primary number: ' + obj._id)

      });


  }

}
