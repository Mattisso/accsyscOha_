/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var express = require('express');
var url = require('url');
var nstbalanceinputsRouter = express.Router();
var nstBalanceInput = require('../omodels').nstBalanceInput;
var objqueriesparams = require('../helper/objQueriesParams')
var dataservice = require('../helper/models/nstbalanceinput/nstbalanceinputCtrl')



/*   version v4 nstbalanceinputs     */

nstbalanceinputsRouter.get('/nstbalanceinputs/', function (req, res, next) {
  dataservice.index(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {
        //    req.result = result
        res.json( )
      }
    })

});

nstbalanceinputsRouter.get('/:NumCompte', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    console.log('Requesting a specific NumCompte: ', req.params.id);
    var _comptenumber = objqueriesparams.getnumcompte(req.params.id)
    dataservice.findByCompteNumber(_comptenumber)
      .exec(function (err, result) {
        if (err) {
          next(err);
          res.status(500).end('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (res != null) {
              res.status(404).end('Not Found');
            }
            return;
          }

          if (res != null) {
            res.status(201).json(
              {
                object: 'balancesheetinput:',
                result: result

              }
            )
          }

        }


      })
  }
  else {
    return next();
  }

});

nstbalanceinputsRouter.post('/create', function (req, res, next) {
  var requestBody = req.body;
  // var obj =  baserepos.toInitializeInstance(nstBalanceInput,requestBody);
  var comptenumber = objqueriesparams.getnumcompte(requestBody.NumCompte);
  dataservice.SearchBy(nstBalanceInput, comptenumber)
    .exec(function (err, data) {
      if (err) {
    return    next(err);
      }
      if (data) {

        res.status(403).end(`NumCompte: ${requestBody.NumCompte}  already exists`);
      }
      else if ((requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeDebit
        && requestBody.SoldeDebit > 0) ||
        (requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeCredit
          && requestBody.SoldeCredit > 0)) {

        dataservice.createBalanceInput(nstBalanceInput,requestBody, function (err) {
          if (!err) {

            res.status(201).json(comptenumber);
          }
        });
      }
      else {
        res.status(403).send(`Error while saving obj with primary obj number: ${comptenumber.NumCompte}`);
      }
    });

});

nstbalanceinputsRouter.delete('/delete/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  var requestBody = req.body;
  dataservice.deleteBalanceInput(req.params.id)
    .exec(function (err, data) {
      if (err) {
    next(err);
        if (res != null) {
          res.status(500).end('Internal server err');
        }
        return;
      } else {
        if (!data) {
          if (res != null) {
            res.status(404).end('Not Found');
          }
          return;
        } else {
          data.remove(function (err) {
            if (!err) {
              data.remove();

            }
          });

          if (res != null) {
            res.status(201).send(req.params.id);
          }
        }
      }
    });
});

nstbalanceinputsRouter.put('/edit/:id', function (req, res, next) {
  var requestBody = req.body;
  // var obj =  baserepos.toInitializeInstance(nstBalanceInput,requestBody);
 // var comptenumber = objqueriesparams.getnumcompte(req.params.id);
 var reqparam= req.params.id;

  dataservice.editBalanceInput(requestBody,reqparam, function (err) {
    if (!err) {
      res.writeHead(201, {
        'Content-Type': 'text/plain'
      });
      // res.setHeader('Content-Type', 'application/json');
      res.end(`Successfully updated  compte number:  ${reqparam}`);
    }
  });
});
/*
nstbalanceinputsRouter.get('/v2/nstbalanceinputs/', function (req, res, next) {
  res.json({
    NumCompte: req.query.id,
    _id: req.query.id
  });

  //build a JSON string with the attribute and the value
  var get_params = url.parse(req.url, true).query;
  if (Object.keys(get_params).length == 0) {
    dataservice.index(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {
        //    request.result = result
        res.json(
          {
            object: 'obj:',
            result: result

          }
        )
      }
      next()

    })
  }
  if (get_params.id) {

    var key = Object.keys(get_params)[0];
    var value = get_params[key];

    dataservice.query_by_arg(nstBalanceInput, key,
      value, function (err, result) {
        if (err) {
          next(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (res != null) {
              console.log(res)
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('Not Found');
            }
            return;
          }

          if (res != null) {
             res.status(201).json(
                      {
                        object: 'balanceSheetInput',
                        result: result

                      }
                  )
         }

        }


      })
  }
  else {
    return next();
  }


})*/

module.exports = nstbalanceinputsRouter;
