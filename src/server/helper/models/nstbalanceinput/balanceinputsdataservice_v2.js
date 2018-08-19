/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();
var url = require('url');
var objqueriesparams= require('../helper/objQueriesParams')
var baserepos=require('../helper/models/base')

var nstBalanceInput = require('../omodels/index').nstBalanceInput;

var async = require('async')
var balanceinputdata = require('../helper/models/nstbalanceinput.v1')




module.exports.list = function (req, res, next) {
  baserepos.index(nstBalanceInput)
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
};


module.exports.findByCompteNumber = function (req, res, next) {
  if (req.params.NumCompte) {
    console.log('Requesting a specific NumCompte: ', req.params.NumCompte);
         var _comptenumber= objqueriesparams.getnumcompte(req.params.NumCompte)
    baserepos.SearchBy(nstBalanceInput, _comptenumber)
    .exec( function (err, result) {
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

}



module.exports.getByid = function (req, res, next) {
  if (req.params.id) {
    console.log('Requesting a specific id :', req.params.id);
    var _id= objqueriesparams.getbyid(req.params.id)
    baserepos.SearchBy(nstBalanceInput, _id)
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
              console.log(res)
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
};

module.exports.create = function (req, res, next) {
  var requestBody = req.body;
 // var obj =  baserepos.toInitializeInstance(nstBalanceInput,requestBody);
  var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
   baserepos.SearchBy(nstBalanceInput, comptenumber)
  .exec(function (err, data) {
    if (err) {
      next(err);
    //  return;
    }

    if (data) {
      res.writeHead(403, {
        'Content-Type': 'text/plain'
      });
      res.end(`NumCompte: ${comptenumber.NumCompte}  already exists`);
    }
    else if ((requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeDebit
      && requestBody.SoldeDebit > 0) ||
      (requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeCredit
        && requestBody.SoldeCredit > 0))
        {

          baserepos.createBalanceInput(requestBody, function(err){
            console.log(data)
            if(!err) {
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

};

module.exports.edit = function (req, res, next) {

  var requestBody = req.body;
  var obj = balanceinputdata.toBalanceinput(requestBody);
  var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
  baserepos.SearchBy(nstBalanceInput, comptenumber)
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
          res.send('Successfully updated obj with primary number: ' + obj.NumCompte);
       //   return next();
        }

      }
      //poulate the document with the updated values

      return next();


    }
  });

};

module.exports.remove = function (req, res, next) {
  var requestBody = req.body;
  console.log('Deleting obj  with compte number: '
    + req.params.NumCompte);
    var comptenumber = objqueriesparams.getnumcompte(req.params.NumCompte);
    baserepos.SearchBy(nstBalanceInput, comptenumber)
   .exec(function(err, data) {
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
};

exports.query_by_arg = function (req, res, next) {
  //build a JSON string with the attribute and the value
  var get_params = url.parse(req.url, true).query;
  if (Object.keys(get_params).length == 0)

  {
    balanceinputdata.index(function (err, result) {
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
	}
  if (get_params.NumCompte)
	{

		var key = Object.keys(get_params)[0];
    var value = get_params[key];

    balanceinputdata.query_by_arg(key,
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
         //   res.setHeader('Content-Type', 'application/json');
            req.result = result;
    /*      res.json(
              {
                object: 'obj:',
                result: result

              }
          )*/
            return next();


          }

        }


      })
  }
  else {
    return next();
  }
}



exports.paginate = function (model, req, res) {

  model.paginate({},
    req.query.page,
    req.query.limit,
    function (error, pageCount, result, itemCount) {
      if (error) {
        console.error(error);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Internal server error');
        return;
      }

      res.json({
        object: 'contacts',
        page_count: 20,
        result: result
      });

    });
}


