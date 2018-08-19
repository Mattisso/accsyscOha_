"use strict"

var async = require('async')


var objqueriesparams= require('../objQueriesParams')

var balanceinputdata = require('./nstbalanceinput')


var SearchBy= function (model, _comptenumber) {
  var getquery = model.findOne((_comptenumber), {});
  return getquery;
};
var createBalanceInput= function (body, callback) {
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
};


  module.exports = {
    index: function (model, request, response, next) {
      model.find({}, {}, { limit: 6, sort: { IntitulCompte: 'desc' } })
        .exec(function (err, result) {
          if (err) {
            return next(err);

          }
          if (response != null) {
            //    request.result = result
            response.json(
              {
                object: 'obj:',
                result: result

              }
            )
          }
          next()

        })
      // return  nsbalanceinputCtrl.findAll(request, response, next)
    },
    /*
      SearchBy: function (model, _comptenumber,request, response, next) {
      model.findOne((_comptenumber), {})
      .exec( function (err, result) {
        if (err) {
          next(err);
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (response != null) {
              response.writeHead(404, { 'Content-Type': 'text/plain' });
              response.end('Not Found');
            }
            return;
          }

          if (response != null) {
            response.setHeader('Content-Type', 'application/json');
           //  request.result=result;
          response.json(
              {
                object: 'obj:',
                result: result

              }
            )
            return next();


          }

        }


      })
      },*/

    findByid: function (model, request, response, next) {

      model.findByid(request.params.id,
        function (err, result) {
          if (err) {
            next(err);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal server err');
            return;
          }
          else {
            if (!result) {

              if (response != null) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Not Found');
              }
              return;
            } else if (response != null) {
              response.setHeader('Content-Type', 'application/json');
              response.send(result);
              return;
              //    next()
            }
            //    response.json(result);

          }

        })
    },

    toInitializeInstance: function (model, body) {

      return new model({
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




    query_by_arg: function (model, key, value, callback) {
      //build a JSON string with the attribute and the value
      var filterArg = '{"' + key + '":' + '"' + value + '"}';
      var filter = JSON.parse(filterArg);

      model.find(filter, {},
        function (err, result) {

          if (err)
            return callback(err);

          return callback(null, result);
        });
    }

  };


  module.exports.create = function (model, req, response, next) {
    var requestBody = req.body;
    // var obj =  baserepos.toInitializeInstance(nstBalanceInput,requestBody);
    var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
    SearchBy(model, comptenumber)
      .exec(function (err, data) {
        if (err) {
          next(err);
          //  return;
        }

        if (data) {
          response.writeHead(403, {
            'Content-Type': 'text/plain'
          });
          response.end(`NumCompte: ${comptenumber.NumCompte}  already exists`);
        }
        else if ((requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeDebit
          && requestBody.SoldeDebit > 0) ||
          (requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeCredit
            && requestBody.SoldeCredit > 0)) {

          createBalanceInput(requestBody, function (err) {
            if (!err) {
              response.writeHead(201, {
                'Content-Type': 'text/plain'
              });
              // response.setHeader('Content-Type', 'application/json');
              response.end(`Successfully created obj with primary compte number:  ${comptenumber.NumCompte}`);
            }
          });
        }
        else {
          response.status(403).send(`Error while saving obj with primary obj number: ${comptenumber.NumCompte}`);
        }
      });

  };
