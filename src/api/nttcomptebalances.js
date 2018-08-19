
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');
var express = require('express');
var nttcomptebalanceRouter = express.Router();

var objqueriesparams = require( path.join(__dirname,'../server/helper/objQueriesParams'));
var dataservice = require( path.join(__dirname,'../server/helper/models/nttcomptebalance/nttcomptebalanceCtrl'));

// nttcomptebalances
/*
nttcomptebalanceRouter.get('/nttcomptebalances', function (req, res, next) {
  return ntbalanceCtrl.getAll(req, res, next);
}
);

nttcomptebalanceRouter.get('/nttcomptebalances/:id', function (req, res, next) {
  return ntbalanceCtrl.getById(req, res, next)
});

nttcomptebalanceRouter.post('/nttcomptebalances', function (req, res, next) {
  return ntbalanceCtrl.create(req, res, next)
});
nttcomptebalanceRouter.put('/nttcomptebalances/:id', function (req, res, next) {
  return ntbalanceCtrl.edit(req, res, next);
});
nttcomptebalanceRouter.delete('/nttcomptebalances/:id', function (req, res, next) {
  return ntbalanceCtrl.del(req, res, next);
});

nttcomptebalanceRouter.get('/v4/nttcomptebalances/', function (req, res, next) {
  dataservice.index(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {
        //    req.result = result
        res.json(
          {
            object: 'nttcomptebalances:',
            CompteBalanceData: result

          }
        )
      }
      next()

    })
  // return  nsbalanceinputCtrl.findAll(req, res, next)

});

nttcomptebalanceRouter.get('/v4/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    console.log('Requesting a specific id: ', req.params.id);
    var _comptenumber = objqueriesparams.getid(req.params.id)
    dataservice.getById(_comptenumber)
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
                object: 'nttcomptebalances:',
                CompteBalanceData: result

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

nttcomptebalanceRouter.post('/v4/nttcomptebalances', function (req, res, next) {
  var requestBody = req.body;
  // var obj =  baserepos.toInitializeInstance(nstBalance,requestBody);

  dataservice.searchForDuplicate(requestBody,
    function (err, data) {
      if (err) {
        next(err);
        //  return;
      }

      if (data) {
        console.log(data)
        res.writeHead(403, {
          'Content-Type': 'text/plain'
        });
        res.end(`NumCompte: ${requestBody._oreference_id}  already exists`);
      }
      else if (requestBody._oexerccompta_id && requestBody._otableauposte_id && requestBody._oreference_id)
       {

        dataservice.createModel(requestBody, function (err) {

          if (!err) {
            res.writeHead(201, {
              'Content-Type': 'text/plain'
            });
            // res.setHeader('Content-Type', 'application/json');
            res.end(`Successfully created obj with primary compte number:  ${requestBody._oreference_id}`);
          }
        });
      }
      else {
        res.status(403).send(`Error while saving obj with primary obj number: ${requestBody._oreference_id}`);
      }
    });

});

nttcomptebalanceRouter.delete('/v4/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  var requestBody = req.body;
  console.log('Deleting obj  with compte number: '
    + req.params.id);
  var comptenumber = objqueriesparams.getbyid(req.params.id);
  dataservice.getById(comptenumber)
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
            res.send(`Successfully Deleted nstbalanceinput with compte number: ${comptenumber.id}`);
          }
          return next();
        }
      }
    });
});

nttcomptebalanceRouter.put('/v4/nttcomptebalances/:id', function (req, res, next) {
  // console.log(req.url + ' : querying for ' + req.params.NumCompte);
  var requestBody = req.body;
  var obj = helper.Nttcomptebalace.toInitializeInstance(requestBody);
  var comptenumber = objqueriesparams.getbyid(req.params.id);
  dataservice.getById(comptenumber)
    .exec(function (err, data) {
      if (err) {
        return next(err);
      } else {

        if (data) {

          data._oexerccompta_id = obj._oexerccompta_id;
          data._otableauposte_id = obj._otableauposte_id;
          data._oreference_id = obj._oreference_id;

          data.save(function (err) {
            if (!err) {
              console.log('Successfully updated obj with primary number: ' + obj._id);
              data.save();
            } else {
              console.log('err on save');
            }
          });
          if (res != null) {
            res.send('Successfully updated  with primary number: ' + obj._id);
            //   return next();
          }

        }
        //poulate the document with the updated values

        return next();


      }
    });
});
*/
nttcomptebalanceRouter.get('/nttcomptebalances/', function (req, res, next) {
  dataservice.index(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {

        res.json(
          {
            object: 'nttcomptebalances:',
            CompteBalanceData: result

          }
        )
      }
      next()

    })

});

nttcomptebalanceRouter.get('/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    console.log('Requesting a specific id: ', req.params.id);
    var _comptenumber = objqueriesparams.getid(req.params.id)
    dataservice.getById(_comptenumber)
      .exec(function (err, result) {
        if (err) {
          next(err);
          res.status(500).json('Internal server err');
          return;
        }
        else {
          if (!result) {
            if (res != null) {
              res.status(404).json('Not Found');
            }
            return;
          }

          if (res != null) {

            //  req.result=result;
            res.status(200).json(
              {
                object: 'nttcomptebalances:',
                CompteBalanceData: result

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

nttcomptebalanceRouter.post('/nttcomptebalances', function (req, res, next) {
  var requestBody = req.body;
  // var obj =  baserepos.toInitializeInstance(nstBalance,requestBody);

  dataservice.searchForDuplicate(requestBody,
    function (err, data) {
      if (err) {
return next(err);

      }

      if (data) {
        res.status(403).end(`NumCompte: ${requestBody._oreference_id}  already exists`);
      }
      else
       {

        dataservice.create(requestBody, function (err, results) {

          if (!err) {

            res.status(201).json(results);
          }
        });
      }

    });

});

nttcomptebalanceRouter.delete('/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  var requestBody = req.body;
  console.log('Deleting obj  with compte number: '
    + req.params.id);
  var comptenumber = objqueriesparams.getid(req.params.id);
  dataservice.delete(req.params.id,function(err,results){
    if (err) {
      next(err);
      if (res != null) {
     //   res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.status(500).send('Internal server err');
      }
      return;
    } else {
      if (!results) {
        if (res != null) {
     //     res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.status(404).send('Not Found');
        }
        return;
      } else {


        if (res != null) {
          res.send({"results":results})
        }
        return next();
      }
    }

  });

});

nttcomptebalanceRouter.put('/nttcomptebalances/:id', function (req, res, next) {
   console.log(req.url + ' : querying for ' + req.params.id);
  var requestBody = req.body,
  requestparamid=req.params.id;
  dataservice.edit(requestBody,requestparamid, function(err, results) {

    if (err) {
      return next(err);
    } else {
      if (res !== null) {
        res.status(200).json( results);

      }
    }


  })

});
module.exports = nttcomptebalanceRouter;
