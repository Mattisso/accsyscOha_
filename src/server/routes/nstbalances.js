
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');
var express = require('express');
var async = require('async')
var nsbalanceRouter = express.Router();
var nsbalanceCtrl = require('../controllers/nstbalances');
var _v1 = require('../controllers/balanceinputsdataservice');
var _v2 = require('../controllers/balanceinputsdataservice_v1');
var nstBalance = require('../omodels').nstBalance;
var objqueriesparams = require('../helper/objQueriesParams')

function index(model, callback) {
  var getquery = model.find({}, {}, { limit: 6, sort: { IntitulCompte: 'desc' } })
  return getquery;
}

function SearchBy(model, _comptenumber) {
  var getquery = model.findOne((_comptenumber), {});
  return getquery;
}

function toBalanceinput(model, body) {

  return new model(
    {
      NumCompte: body.NumCompte,
      IntitulCompte: body.IntitulCompte,
      SoldeDebit: body.SoldeDebit,
      SoldeCredit: body.SoldeCredit

    });
}

function createBalanceInput(body, callback) {
  var arr = [];

  var obj = toBalanceinput(nstBalance, body);
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
}

//nstbalances
nsbalanceRouter.get('/nstbalances', function (req, res, next) {
  return nsbalanceCtrl.getAll(req, res, next);
}
);

nsbalanceRouter.get('/nstbalances/:id', function (req, res, next) {
  return nsbalanceCtrl.getById(req, res, next)
});



nsbalanceRouter.post('/nstbalances', function (req, res, next) {
  return nsbalanceCtrl.create(req, res, next)
});
nsbalanceRouter.put('/nstbalances/:id', function (req, res, next) {
  return nsbalanceCtrl.edit(req, res, next);
});
nsbalanceRouter.delete('/nstbalances/:id', function (req, res, next) {
  return nsbalanceCtrl.del(req, res, next);
});

nsbalanceRouter.get('/v4/nstbalances/', function (req, res, next) {
  index(nstBalance)
    .exec(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {
        //    req.result = result
        res.json(
          {
            object: 'obj:',
            result: result

          }
        )
      }
      next()

    })
  // return  nsbalanceinputCtrl.findAll(req, res, next)

});

nsbalanceRouter.get('/v4/nstbalances/:NumCompte', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.NumCompte);
  if (req.params.NumCompte) {
    console.log('Requesting a specific NumCompte: ', req.params.NumCompte);
    var _comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte)
    SearchBy(nstBalance, _comptenumber)
      .exec(function (err, result) {
        if (err) {
          next(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (res != null) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('Not Found');
            }
            return;
          }

          if (res != null) {
            res.setHeader('Content-Type', 'application/json');
            //  req.result=result;
            res.json(
              {
                object: 'obj:',
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

});

nsbalanceRouter.post('/v4/nstbalances', function (req, res, next) {
  var requestBody = req.body;
  // var obj =  baserepos.toInitializeInstance(nstBalance,requestBody);
  var comptenumber = objqueriesparams.getnumcompte(requestBody.NumCompte);
  console.log(comptenumber)
  SearchBy(nstBalance, comptenumber)
    .exec(function (err, data) {
      if (err) {
        next(err);
        //  return;
      }

      if (data) {
        res.writeHead(403, {
          'Content-Type': 'text/plain'
        });
        res.end(`NumCompte: ${requestBody.NumCompte}  already exists`);
      }
      else if ((requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeDebit
        && requestBody.SoldeDebit > 0) ||
        (requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeCredit
          && requestBody.SoldeCredit > 0)) {

        createBalanceInput(requestBody, function (err) {
          console.log(data)
          if (!err) {
            res.writeHead(201, {
              'Content-Type': 'text/plain'
            });
            // res.setHeader('Content-Type', 'application/json');
            res.end(`Successfully created obj with primary compte number:  ${comptenumber.NumCompte}`);
          }
        });
      }
      else {
        res.status(403).send(`Error while saving obj with primary obj number: ${comptenumber.NumCompte}`);
      }
    });

});

nsbalanceRouter.delete('/v4/nstbalances/:NumCompte', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.NumCompte);
  var requestBody = req.body;
  console.log('Deleting obj  with compte number: '
    + req.params.NumCompte);
  var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
  SearchBy(nstBalance, comptenumber)
    .exec(function (err, data) {
      if (err) {
        next(err);
        if (res != null) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server err');
        }
        return;
      } else {
        if (!data) {
          console.log('not found');
          if (res != null) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
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

          if (res != null) {
            res.send(`Successfully Deleted nstbalanceinput with compte number: ${comptenumber.NumCompte}`);
          }
          return next();
        }
      }
    });
});


nsbalanceRouter.put('/v4/nstbalances/:NumCompte', function (req, res, next) {
  // console.log(req.url + ' : querying for ' + req.params.NumCompte);
  var requestBody = req.body;
  var obj = toBalanceinput(nstBalance, requestBody);
  var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
  SearchBy(nstBalance, comptenumber)
    .exec(function (err, data) {
      if (err) {
        return next(err);
      } else {

        if (data) {
          data.NumCompte = obj.NumCompte;
          data.IntitulCompte = obj.IntitulCompte;
          data.SoldeDebit = obj.SoldeDebit;
          data.SoldeCredit = obj.SoldeCredit;

          data.save(function (err) {
            if (!err) {
              console.log('Successfully updated obj with primary number: ' + obj.NumCompte);
              data.save();
            } else {
              console.log('err on save');
            }
          });
          if (res != null) {
            res.send('Successfully updated  with primary number: ' + obj.NumCompte);
            //   return next();
          }

        }
        //poulate the document with the updated values

        return next();


      }
    });
});

module.exports = nsbalanceRouter;
