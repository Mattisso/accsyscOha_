"use strict"

var async = require('async')
var toInitializeInstance= require('./toInitializeInstance')


module.exports = {
  index: function (model) {
   var getquery= model.find({}, {}, { limit: 6});
    return getquery;
  },

  selector: function (country, school) {
    return function(student) {
    return student.address.country() === country &&
    student.school() === school;
    };
    },

  SearchBy:  function (model, obj) {
    var getquery = model.findOne((obj), {});
    return getquery;
  },


  create: function (model,body, callback) {
    var arr = [];

    var obj = toInitializeInstance.toinit().toCreateComptebalancedetail(model,body);

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
  edit: function (model, data, body, callback) {
    var arr = [];
    var obj = toInitializeInstance.toinit.toCreateComptebalancedetail(model,body);

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

/*
  createComptebalanceDetail: function (model, requestparamid, body, callback) {
    var arr = [];

    var obj = toInitializeInstance.toinit().toCompteBalanceDetail(model, requestparamid, body);
    /*  if (!((body.NumCompte && body.IntitulCompte && body.SoldeDebit
         && body.SoldeDebit > 0) ||
         (body.NumCompte && body.IntitulCompte && body.SoldeCredit
           && body.SoldeCredit > 0)))

    arr.push(obj);

    async.eachSeries(arr, function (result, SavedCallBack) {
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
              error: 'Error inserting new record.'
            }));
          }
        }
        else {

          SavedCallBack();
          //  return SavedCallBack(err)
        }
      });
    }, function (err, result) {
      if (err)
        return (err);
      setTimeout(function () {

        return callback(null, result);
      }, 200);
    });
  },
*/


  query_by_arg : function ( model,key, value, callback) {
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
