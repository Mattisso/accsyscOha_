"use strict"
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
//var Models = require('../../omodels');
var async = require('async');
var objQueriesParams = require('../../objQueriesParams')
var Models = require('../../../omodels');
var comptebalanceModel = require('./nttcomptebalance')
var detailservice = require('../nttcomptebalancedetail/nttComptebalancedetailCtrl')
var _ = require('lodash');
// var Models.nttCompteBalanceDetail = require('../../../omodels/index').Models.nttCompteBalanceDetail;


module.exports = {
  index: function (callback) {
    Models.nttCompteBalance.find({}, {}, { sort: { 'CreatedOn': -1 }},
      function (err, nttcomptebalances) {
        if (err) {
          throw err;
        }
        else {
          async.eachSeries(nttcomptebalances, function (nttcomptebalance, nttcomptecallback) {
            var qyrparm = nttcomptebalance._id
            Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
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

  getById: function (paramId) {
    var getquery = Models.nttCompteBalance.findOne(paramId, {})
      .populate('nttcomptebalancedetails')
    return getquery;
  },

  searchForDuplicate: function (requestBody, callback) {

    var qy = comptebalanceModel.init().selector(requestBody)
    Models.nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        if (nttcomptebalance) {
          var qyrparm = nttcomptebalance._id
          Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err
              }
              else {
                // mergeoreference.nttcomptebalance= nttcomptebalance,
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails

                callback(null, nttcomptebalance);

              }
            })

        }
        else {
          callback(null, null)

        }

      })

  },

  searchBy: function (requestBody, callback) {
    var qy = comptebalanceModel.init().selector(requestBody)
    Models.nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else {
          var qyrparm = nttcomptebalance._id
          Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err
              }
              else {
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails

                callback(null, nttcomptebalance);

              }
            })

        }
      })

  },

  delete: function (requestparamid, callback) {

    async.series({

      comptebalancedelete: function (callback) {
        comptebalanceModel.init().compteBalanceExists(requestparamid)
          .exec(function (err, data) {
            if (err) {
              throw (err);

            } else {
              if (!data) {
                return callback( null,
                  {
                    success: false,
                    message: ` itemid : ${requestparamid}  not found.`
                  });

              } else {
                data.remove(function (err) {
                  if (!err) {
                    data.remove();

                    callback(null,

                      {
                        success: true,
                        message: ` item(s) with id : ${requestparamid}  was deleted.`
                      }

                    );


                  }

                });

              }

            }
          })

      },
      comptebalancedetailsdelete: function (callback) {

        detailservice.detelecomptebalancedetail(requestparamid, callback);

      }

    },

      function (err, results) {

        if (err) {
          throw (err);
        } else {
          callback(null, results);
        }
    //    process.exit(0);
      });
  },


  edit: function (requestBody, requestparamid, callback) {

    async.series({
      editcomptebalance: function (callback) {

        comptebalanceModel.init().compteBalanceExists(requestparamid)
          .exec(function (err, data) {
            //        console.log(data)
            if (err) {
              return callback(err);
            } else {
              if(!data) {
                return (new Error({
                  error: `itemid: ${requestparamid} not found!`
                }));
              }

              else if (data) {
                var result = comptebalanceModel.init().toUpdateCompteBalance(data, requestparamid, requestBody)

                result.save(function (err) {
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
                        error: 'Error on save record.'
                      }));
                    }

                  }
                  else {
                    callback(null, result)
                  }
                });


              }


            }


          });

      },


      editcomptebalancedetail: function (callback) {
        detailservice.editcomptebalanceDetail(requestBody, requestparamid, callback)
      }
    },

      function (err, results) {

        if (err) {
          throw (err);
        } else {
          callback(null, results);
        }
    //    process.exit(0);
      });

  },

  create: function (requestBody, callback) {
    var obj = comptebalanceModel.init().toInitializeInstance(requestBody),
    _comptebalance = obj.balance,
    requestparamid=_comptebalance._id,
     _getdata = obj.getData,
     _comptedetails = [],
      isValid = false;

    _comptedetails = _getdata.nttcomptebalancedetails;
    async.series({

      createcomptebalance: function (callback) {

        isValid = comptebalanceModel.init().queryselector(_comptebalance);

        if (isValid === false) {
          return (new Error({
            error: ' error There was an error!'
          }));

        } else {

          _comptebalance.save(function (err) {

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
              callback(null, _getdata)
            }

          });


        }
      },
      createComptebalanceDetail: function (callback) {

        detailservice.createComptebalanceDetail(_comptedetails,requestparamid, callback)
      }

    },

      function (err, results) {

        if (err) {
          throw (err);
        } else {
          callback(null, results);
        }
    //    process.exit(0);
      });
  }

}
