/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();
var url = require('url');

var async = require('async')
var balanceinputdata = require('../helper/models').Nstbalanceinput


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
           //  request.result=result;
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



module.exports.getByid = function (request, response, next) {
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
              console.log(response)
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
};

module.exports.create = function (request, response, next) {
  var requestBody = request.body;
  var balanceinput = balanceinputdata.toBalanceinput(requestBody);
  var comptenumber = requestBody.NumCompte;
  balanceinputdata.findByNumCompte(comptenumber, function (err, data) {
    if (err) {
      next(err);
    //  return;
    }

    if (data) {
      response.writeHead(403, {
        'Content-Type': 'text/plain'
      });
      response.end(`NumCompte: ${comptenumber}  already exists`);
    }
    else if ((requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeDebit
      && requestBody.SoldeDebit > 0) ||
      (requestBody.NumCompte && requestBody.IntitulCompte && requestBody.SoldeCredit
        && requestBody.SoldeCredit > 0))
        {
          balanceinputdata.createBalanceInput(request.body, function(err){
            console.log(data)
            if(!err) {
              response.writeHead(201, {
                'Content-Type': 'text/plain'
              });
             // response.setHeader('Content-Type', 'application/json');
              response.end(`Successfully created balanceinput with primary compte number:  ${comptenumber}`);
            }
          });
        }
    else {
             response.status(403).send(`Error while saving balanceinput with primary balanceinput number: ${comptenumber}`);
    }
  });

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
            console.log('Successfully updated balanceinput with primary number: ' + balanceinput.NumCompte);
            data.save();
          } else {
            console.log('err on save');
          }
        });
        if (response != null) {
          response.send('Successfully updated balanceinput with primary number: ' + balanceinput.NumCompte);
       //   return next();
        }

      }
      //poulate the document with the updated values

      return next();


    }
  });

};

module.exports.remove = function (req, response, next) {

  console.log('Deleting balanceinput  with compte number: '
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

exports.query_by_arg = function (req, response, next) {
  //build a JSON string with the attribute and the value
  var get_params = url.parse(req.url, true).query;
  if (Object.keys(get_params).length == 0)

  {
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
	}
  if (get_params.NumCompte)
	{

		var key = Object.keys(get_params)[0];
    var value = get_params[key];

    balanceinputdata.query_by_arg(key,
      value, function (err, result) {
        if (err) {
          next(err);
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (response != null) {
              console.log(response)
              response.writeHead(404, { 'Content-Type': 'text/plain' });
              response.end('Not Found');
            }
            return;
          }

          if (response != null) {
         //   response.setHeader('Content-Type', 'application/json');
            req.result = result;
    /*      response.json(
              {
                object: 'balanceinput:',
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


