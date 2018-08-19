/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();

var async = require('async')
var balanceinputdata = require('../helper/models/index').Nstbalanceinput
/*
router.param('username', function(request, response, next, username){
  console.log(
    'Username param was is detected: ',
    username
  )
  findUserByUsername(
    username,
    function(error, user){
      if (error) return next(error);
      request.user = user;
      return next();
    }
  );
})*/

//var nstBalanceInput = require('../omodels').nstBalanceInput
// var nsbalanceinputCtrl = require('../../api/nstbalanceinputs');

module.exports.list = function (request, response, next) {
  balanceinputdata.index(function (err, result) {
    if (err) {
      return next(err);

    }
    if (response != null) {
      //    request.result = result
      response.json(
        {
          object: 'balanceinput:',
          result: result

        }
      )
    }
    next()

  })
  // return  nsbalanceinputCtrl.findAll(request, response, next)
};


module.exports.findByCompteNumber = function (request, response, next) {

  if (request.params.NumCompte) {

    console.log('Requesting a specific NumCompte: ', request.params.NumCompte);
    balanceinputdata.findByNumCompte(request.params.NumCompte,
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
          }

          if (response != null) {
            response.setHeader('Content-Type', 'application/json');
            // request.result=result;
            response.json(
              {
                object: 'balanceinput:',
                result: result

              }
            )
            return next();


          }

        }


      })
  }
  else {
    return next();
  }

}



module.exports.getById = function (request, response, next) {
  if (request.params.id) {
    console.log('Requesting a specific id :', request.params.id);
    balanceinputdata.findByid(request.params.id,
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

  }
  else {
    return next();
  }

};

module.exports.edit = function (request, response, next) {

  var requestBody = request.body;
  var balanceinput = balanceinputdata.toBalanceinput(requestBody);
  balanceinputdata.findByNumCompte(requestBody.NumCompte, function (err, data) {
    if (err) {
      return next(err);
    } else {

            if (data) {
        data.NumCompte = balanceinput.NumCompte;
        data.IntitulCompte = balanceinput.IntitulCompte;
        data.SoldeDebit = balanceinput.SoldeDebit;
        data.SoldeCredit = balanceinput.SoldeCredit;

        data.save(function (err) {
          if (!err) {
            console.log('Successfully updated balanceinput with primary number: ' + request.params.NumCompte);
            data.save();
          } else {
            console.log('err on save');
          }
        });
        if (response != null) {
          response.send('Successfully updated balanceinput with primary number: ' + request.params.NumCompte);
          return next();
        }

      }
      //poulate the document with the updated values




    }
  });

};

module.exports.remove = function (req, response, next) {

  console.log('Deleting contact with primary number: '
    + req.params.NumCompte);
  balanceinputdata.findByNumCompte(req.params.NumCompte, function (err, data) {
    if (err) {
      next(err);
      if (response != null) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal server err');
      }
      return;
    } else {
      if (!data) {
        console.log('not found');
        if (response != null) {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Not Found');
        }
        return;
      } else {
        data.remove(function (err) {
          if (!err) {
            data.remove();

          }
          else {
            console.log(err);
          }
        });

        if (response != null) {
          response.send(`Successfully Deleted nstbalanceinput with compte number: ${req.params.NumCompte}`);
        }
        return next();
      }
    }
  });
};

exports.query_by_arg = function (model, key, value, response) {
  //build a JSON string with the attribute and the value
  var filterArg = '{"' + key + '":' + '"' + value + '"}';
  var filter = JSON.parse(filterArg);

  model.find(filter, function (err, result) {
    if (err) {
      console.err(err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Internal server err');
      return;
    } else {
      if (!result) {
        if (response != null) {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Not Found');
        }
        return;
      }

      if (response != null) {
        response.setHeader('Content-Type', 'application/json');
        response.send(result);
      }
    }
  });
}


exports.paginate = function (model, request, response) {

  model.paginate({},
    request.query.page,
    request.query.limit,
    function (error, pageCount, result, itemCount) {
      if (error) {
        console.error(error);
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.end('Internal server error');
        return;
      }

      response.json({
        object: 'contacts',
        page_count: 20,
        result: result
      });

    });
}

  module.exports.create = function (request, response, next) {
    var balanceinput = balanceinputdata.toBalanceinput(request.body);
    var comptenumber = request.body.NumCompte;
    console.log(request.body.NumCompte);
    balanceinputdata.findByNumCompte(comptenumber, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      var balanceinput = balanceinputdata.toBalanceinput(request.body);
      if (data) {
        console.log('The balanceinput does not exist. It will be created');
        response.status(403).send(`NumCompte: ${comptenumber}  is already taken`);
      }
      else {
        createBalanceInput();
      }
    });
    function createBalanceInput() {
      var arr = [];
      if (!((request.body.NumCompte && request.body.IntitulCompte && request.body.SoldeDebit
        && request.body.SoldeDebit > 0) ||
        (request.body.NumCompte && request.body.IntitulCompte && request.body.SoldeCredit
          && request.body.SoldeCredit > 0))) {
        response.status(400).json({
          err: 'There was an err!'
        });
      }
      else {
        arr.push(balanceinput);
      }
      async.eachSeries(arr, function (balanceinput, SavedCallBack) {
        balanceinput.save(function (err) {
          if (err) {
            if (err.code === 11000) {
              //  return SavedCallBack(err)
              return response.status(500).json({
                error: 'Error  inserting duplicate key.'
              });
            }
            else {
              //  return SavedCallBack(err)
              return response.status(500).json({
                error: 'Error inserting new record.'
              });
            }
          }
          else {
            response.status(201).json(balanceinput);
            SavedCallBack();
            //  return SavedCallBack(err)
          }
        });
      }, function (err, balanceinput) {
        if (err)
          return next(err);
        return response.json(balanceinput);
      });
    }
  };


