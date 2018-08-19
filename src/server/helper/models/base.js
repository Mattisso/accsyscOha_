"use strict"

var async = require('async')


var balanceinputdata = require('./nstbalanceinput')

 function SearchBy(model, _comptenumber) {
  var getquery=  model.findOne((_comptenumber), {});
  return getquery;
  }



module.exports = {
  index: function (model) {
   var getquery=  model.find({}, {}, { limit: 6, sort: { IntitulCompte: 'desc' } });
   return getquery;
   /*   .exec(function (err, nstbalanceinputs) {

        if (err) throw err;
        callback(null, nstbalanceinputs);
      }
      )*/
  },

  create: function(model,requestparameter,callback) {
    SearchBy(model, requestparameter);
    setTimeout(function () {

      return callback(null, null);
    }, 200);
  },

  SearchBy: function (model, _comptenumber) {
  var getquery=  model.findOne((_comptenumber), {});
  return getquery;
/*
      function (err, nstbalanceinput) {

        if (err)
          return callback(new Error(
            'No NumCompte matching '
            + _comptenumber
          )
          );

        return callback(null, nstbalanceinput);
      });*/
  },

  findByid: function (model, id) {

    var getquery= model.findOne({ _id: id }, {});
return getquery;

     /* function (err, nstbalanceinput) {

        if (!nstbalanceinput.id)
          return callback(new Error(
            'No id matching '
            + id
          )
          );
        return callback(null, nstbalanceinput);
      });*/
  },

  toInitializeInstance: function (model, body) {

     return  new  model( {
        NumCompte: body.NumCompte,
        IntitulCompte: body.IntitulCompte,
        SoldeDebit: body.SoldeDebit,
        SoldeCredit: body.SoldeCredit

      });


  },
  createBalanceInput: function (body, callback) {
    var arr = [];

    var obj = balanceinputdata.toBalanceinput(body);
    /*  if (!((body.NumCompte && body.IntitulCompte && body.SoldeDebit
         && body.SoldeDebit > 0) ||
         (body.NumCompte && body.IntitulCompte && body.SoldeCredit
           && body.SoldeCredit > 0)))*/

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




  query_by_arg : function (model, key, value, callback) {
    //build a JSON string with the attribute and the value
    var filterArg = '{"'+ key + '":' +'"'+ value + '"}';
    var filter = JSON.parse(filterArg);

    model.find(filter, {},
      function (err, result) {

        if (err)
          return callback(err);

        return callback(null, result);
      });
  }

};
