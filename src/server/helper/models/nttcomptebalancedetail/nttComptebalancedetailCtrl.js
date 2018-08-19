
"use strict"
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var Models = require('../../../omodels');
var async = require('async');
var objqueriesparams = require('../../objQueriesParams')
var detailModel = require('./nttcomptebalancedetail')
var _ = require('lodash');


// var odahelper = require('../../index')
/*
function searchBy(comptebalance) {
  var getquery = Models.nttCompteBalanceDetail.findOne({ _id: comptebalance }, {})
  return getquery;
}

*/

function DetailExists(_comptebalance) {
  var comptebalance = objqueriesparams.getnttcomptebalanceid(_comptebalance)
  var getquery = Models.nttCompteBalanceDetail.find(comptebalance)
  return getquery;
}



module.exports = {
  index: function (comptebalanceid, callback) {
    Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: comptebalanceid }, {}, { sort: { 'CreatedOn': -1 } },
      function (err, nttcomptebalancedetails) {
              if (err) throw err;
            callback(null, nttcomptebalancedetails);
      });

  },
  createComptebalanceDetail: function (requestBody, requestparamid, callback) {
    var arr = [],
      _arrdetails;

    DetailExists(requestparamid)
      .exec(function (err, results) {
        if (err) {
          throw (err)
        }
        else {

          for (var i = 0; i < requestBody.length; i++) {
            var obj = new Models.nttCompteBalanceDetail(requestBody[i]);
            if (arr.indexOf(requestBody[i].NumCompte == -1)) {
              arr.push(obj);

            }

          }


          async.eachSeries(arr, function (resultdetail, SavedCallBack) {
            resultdetail.save(function (err) {
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
          }, function (err) {
            if (err) {
              return (err);
            }
            else {
              if (arr.length > 0) {
                setTimeout(function () {
               return  callback(null, {

                  Success: true,
                  message: arr.length + ' item(s) created.'

                })
              }, 200);


              }
              else if (arr.length == 0) {
                setTimeout(function () {

                  return callback(null, `no item(s) with Id :${requestparamid}  created`)
                }, 200);

              }

            }


          });
        }
      })
  },

  editcomptebalanceDetail: function (requestbody, requestparamid, callback) {

    async.waterfall([

      function (callback) {
        //   var requestparamid = requestbody.CompteBalanceData._id;
        var mergeostableauposte = [],
          arr = [];
        arr = requestbody.CompteBalanceData.nttcomptebalancedetails;

        async.forEach(arr, function (o, callback_s1) {

          if ((o._nttcomptebalance_id === undefined && o.NumCompte!== undefined) || (o._nttcomptebalance_id === null && o.NumCompte!== undefined)) {

            var obj = detailModel.toinit().toCompteBalanceDetail(requestparamid, o)

            if (mergeostableauposte.indexOf(obj.NumCompte) == -1) {
              mergeostableauposte.push(obj);
            // console.log(obj["NumCompte"])
             }
          }
// mergeostableauposte.push(obj);



          DetailExists(requestparamid)
            .exec(function (err, results) {
              if (err) {
                throw (err)
              }
              else {
                async.eachSeries(results, function (resultdetail, callback_s2) {

                  if (resultdetail._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== undefined && o._nttcomptebalance_id !== null) {

                    var data = detailModel.toinit().toUpdateCompteBalanceDetail(resultdetail, requestparamid, o);



                    if (mergeostableauposte.indexOf(data["NumCompte"]) == -1) {
                      mergeostableauposte.push(data);
                    // console.log(obj["NumCompte"])
                     }
                  }

        //          mergeostableauposte.push(data);

                  callback_s2();

                }, function (err) {
                  if (err) {
                    throw (err)
                  }
                  else {
                    callback_s1();
                  }
                }
                );

              }
            })

        }, function (err) {
          if (err) {
            throw err;
          }
          else {
            callback(null, mergeostableauposte)


          }

        }
        )
      },
      function (mergeostableauposte, callback) {

        var _arrDetails = [],
          objdetail;

        var mergtableauposte = _.uniqBy(mergeostableauposte, 'NumCompte')

        for (var i = 0; i < mergtableauposte.length; i++) {
          objdetail = new Models.nttCompteBalanceDetail(mergtableauposte[i]);

          if (_arrDetails.indexOf(mergtableauposte[i] == -1)) {
            _arrDetails.push(objdetail);
        }
      }


        // _arr=odasubset.odasub().findNumCompteBy(_arrDetails, objdetail.NumCompte);


        async.eachSeries(

          _arrDetails,

          function (objdetail, nttbalanceSavedCallBack) {

            objdetail.save(function (err) {


              if (err) {
                console.dir(err);
              }
              else {
                nttbalanceSavedCallBack();

              }


            });

          },

          function (err) {

            if (err) {
              console.dir(err)
            }
            else {
              setTimeout(function () {
                callback(null, `Finished insertnttCompteBalanceDetail  in seeding ${_arrDetails.length} records inserted`);
              }, 200);

            }
          }
        );

      }
    ], function (err, results) {


      if (err) {

        console.dir(err)
      } else {

        callback(null, results)

      }

    }
    );
  },

  detelecomptebalancedetail: function (requestparamid, callback) {
    var _arrDetails = [];
    DetailExists(requestparamid)
      .exec(function (err, results) {
        if (err) {
          throw (err)
        }
        else {
          if (!results) {
            return callback(null,

              {
                success: false,
                message: ` item(s) with id : ${requestparamid}  not found.`
              }
            )
          }
          else {
            for (var i = 0; i < results.length; i++) {
              var resultdetail = results[i];

              _arrDetails.push(resultdetail);
            }

            async.each(_arrDetails, function (resultdetail, callback_s1) {
              resultdetail.remove(function (err) {
                if (!err) {
                  resultdetail.remove();

                  callback_s1();
                }
              })

            }, function (err) {

              if (err) {
                throw (err)

              }
              else {
                if (_arrDetails.length > 0) {
                  callback(null, {

                    Success: true,
                    message: _arrDetails.length + ' item(s) was deleted.'

                  })


                }
                else if (_arrDetails.length == 0) {
                  callback(null, `no item(s) with Id :${requestparamid} was found`)
                }

              }
            })

          }

        }
      })

  }
}
