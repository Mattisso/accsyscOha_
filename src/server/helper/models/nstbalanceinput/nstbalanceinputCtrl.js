/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();
var url = require('url');
var objqueriesparams= require('../../objQueriesParams')
var baserepos=require('../base')
// var nstBalanceInput = require('../../../omodels/index').nstBalanceInput;
var balanceinputModel = require('./nstbalanceinput')
var Models = require('../../../omodels');

var async = require('async')
//var balanceinputdata = require('../helper/models/nstbalanceinput.v1')

function SearchBy(_comptenumber) {
  var getquery = Models.nstBalanceInput.findOne(({_id: _comptenumber}), {});
  return getquery;
}




module.exports = {

  index: function (callback) {
  Models.nstBalanceInput.find({}, {}, { sort:{ IntitulCompte: 'desc' } },
  function (err, nstbalanceinputs) {
    if (err) throw err;
  callback(null, nstbalanceinputs);
})
},

query_by_arg: function(model, key, value, callback) {
return baserepos.query_by_arg(model, key, value, callback)

},

findByCompteNumber : function (_comptenumber, callback) {
  if (_comptenumber) {

    Models.nstBalanceInput.findOne({NumCompte:_comptenumber},
      function (err, result) {
        if (err) throw err;
        callback(null, result);
      })

    }
},


getById : function (requestparamid,  callback) {
  if (requestparamid) {
    Models.nstBalanceInput.findOne({_id : requestparamid},
      function (err, result) {
        if (err) throw err;
          callback(null, result);
        })

      }
},


createBalanceInput: function (requestBody, callback) {
  var arr = [];

  var data =  balanceinputModel.toinit().toInitializeInstance(requestBody);



   for (var i = 0; i < data._arrbalanceinputs.length; i++) {
    var obj = new Models.nstBalanceInput(data._arrbalanceinputs[i]);
    if (arr.indexOf(data._arrbalanceinputs[i].NumCompte == -1)) {
      arr.push(obj);

    }

}

  arr.push(obj);

  async.eachSeries(arr, function (obj, SavedCallBack) {
    obj.save(function (err) {
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
  }, function (err, obj) {
    if (err)
      return (err);
    setTimeout(function () {

      return callback(null, obj);
    }, 200);
  });
},

editBalanceInput: function (requestBody, requestparamid,callback) {
  // requestBody = req.requestBody;
  var d = new Date();
  var obj = requestBody;

  SearchBy(requestparamid)
 .exec(function (err, data) {
    if (err) {
      return callback(err);
    } else {

            if (data) {
        data.NumCompte = obj.NumCompte;
        data.IntitulCompte = obj.IntitulCompte;
        data.SoldeDebit = obj.SoldeDebit;
        data.SoldeCredit = obj.SoldeCredit;
        data.ModifiedOn = d;

        data.save(function (err) {
          if (!err) {
            console.log('Successfully updated obj with primary number: ' + obj.NumCompte);
            data.save();
          } else {
            console.log('err on save');
          }
        });

      }
      //poulate the document with the updated values

      return callback(null, data);


    }
  });

},
deleteBalanceInput: function (requestparamid, callback) {
  var _arrbalanceinputs = [];
  SearchBy(requestparamid)
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
            var resultbalanceinputs = results[i];

            _arrbalanceinputs.push(resultbalanceinputs);
          }

          async.each(_arrbalanceinputs, function (resultbalanceinputs, callback_s1) {
            resultbalanceinputs.remove(function (err) {
              if (!err) {
                resultbalanceinputs.remove();

                callback_s1();
              }
            })

          }, function (err) {

            if (err) {
              throw (err)

            }
            else {
              if (_arrbalanceinputs.length > 0) {
                callback(null, {

                  Success: true,
                  message: _arrbalanceinputs.length + ' item(s) was deleted.'

                })


              }
              else if (_arrbalanceinputs.length == 0) {
                callback(null, `no item(s) with Id :${requestparamid} was found`)
              }

            }
          })

        }

      }
    })

}
}
