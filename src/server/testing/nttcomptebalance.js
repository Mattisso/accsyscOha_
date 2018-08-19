"use strict"

var Models = require('../omodels');
var async = require('async');
var objQueriesParams= require('../helper/objQueriesParams')
module.exports = {
  index: function (callback) {

    /*  var qy = {
          '$and': [{
            '_otableauposte_id': _otableauposte_id
          }, {
            '_oreference_id': _oreference_id
          }, {
            '_oexerccompta_id': _oexerccompta_id
          }
          ]
      }*/
    Models.nttCompteBalance.find({}, {}, { limit: 2 },
      function (err, nttcomptebalances) {
        if (err) {
          throw err;
        }
        else {
          async.eachSeries(nttcomptebalances, function (nttcomptebalance, nttcomptecallback) {
            var qyrparm = nttcomptebalance._id
            Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: qyrparm }, {},
              function (err, comptebalancedetails) {
                if (err) throw err;
                nttcomptebalance.comptebalancedetails = comptebalancedetails
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


  ByYear: function (selectedByYear = null, selectedByOtableauPoste = null, selectedByOrefence = null, callback) {
    if (selectedByYear !== undefined && selectedByYear !== null
      && selectedByOtableauPoste == null
         && selectedByOrefence == null) {
            var qy= objQueriesParams.getExerccomptaid(selectedByYear)

    /*  var qy = {
          '$and': [{
            '_otableauposte_id': _otableauposte_id
          }, {
            '_oreference_id': _oreference_id
          }, {
            '_oexerccompta_id': _oexerccompta_id
          }
          ]
      }*/
    Models.nttCompteBalance.find(qy, {}, { limit: 2 },
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
    }
  },


  ByYearAndotableauPoste: function (selectedByYear = null, selectedByOtableauPoste = null, selectedByOrefence = null, callback) {
    if (selectedByYear !== undefined && selectedByYear !== null
    && selectedByOtableauPoste !== undefined  && selectedByOtableauPoste !== null
         && selectedByOrefence == null) {
            var year= objQueriesParams.getExerccomptaid(selectedByYear),
            otableauposte= objQueriesParams.getotableauposteid(selectedByOtableauPoste);
            var qy = {
              '$and': [year,otableauposte]}

    /*  var qy = {
          '$and': [{
            '_otableauposte_id': _otableauposte_id
          }, {
            '_oreference_id': _oreference_id
          }, {
            '_oexerccompta_id': _oexerccompta_id
          }
          ]
      }*/
    Models.nttCompteBalance.find(qy, {}, { limit: 2 },
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
    }
  },

  getById: function (paramId, callback) {

    /*  var qy = {
          '$and': [{
            '_otableauposte_id': _otableauposte_id
          }, {
            '_oreference_id': _oreference_id
          }, {
            '_oexerccompta_id': _oexerccompta_id
          }
          ]
      }*/


    Models.nttCompteBalance.findById(paramId, {})
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

  searchBy: function (selectedByYear = null, selectedByOtableauPoste = null, selectedByOrefence = null, callback) {
    if (selectedByYear !== undefined && selectedByYear !== null
      && selectedByOtableauPoste !== undefined && selectedByOtableauPoste !== null
      && selectedByOrefence !== undefined && selectedByOrefence !== null) {
        var year= objQueriesParams.getExerccomptaid(selectedByYear),
        otableauposte= objQueriesParams.getotableauposteid(selectedByOtableauPoste),
        oreference= objQueriesParams.getoreferenceid(selectedByOrefence);
        var qy = {
          '$and': [year,otableauposte,oreference]}

    /*  var qy = {
        '$and': [

          {
            '_oexerccompta_id': selectedByYear
          },
          {
            '_otableauposte_id': selectedByOtableauPoste
          }, {
            '_oreference_id': selectedByOrefence
          }
        ]
      }*/
     // var mergeoreference = {};
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
                 // mergeoreference.nttcomptebalance= nttcomptebalance,
                  nttcomptebalance.nttcomptebalancedetails=nttcomptebalancedetails



                  callback(null, JSON.stringify(nttcomptebalance));

                  }


             })



          }


        })



    }
  },


}
