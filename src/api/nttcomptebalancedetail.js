
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');
var express = require('express');
var async = require('async')
var nttcomptebalancedetailRouter = express.Router({ mergeParams: true });
var nttcomptebalancedetailCtrl = require( path.join(__dirname,'../server/controllers/nttcomptebalancedetails'));
var _v1 = require( path.join(__dirname,'../server/controllers/balanceinputsdataservice'));
var _v2 = require( path.join(__dirname,'../server/controllers/balanceinputsdataservice_v1'));
var nttcomptebalanceRouter = require('./nttcomptebalances');
nttcomptebalanceRouter.use('/nttcomptebalances/:id', nttcomptebalancedetailRouter)


var objqueriesparams = require( path.join(__dirname,'../server/helper/objQueriesParams'));
var helper = require( path.join(__dirname,'../server/helper/models'))
var dataservice = require( path.join(__dirname,'../server/helper/models/nttcomptebalancedetail/nttComptebalancedetailCtrl'));




var nttCompteBalance =require( path.join(__dirname,'../server/omodels')).nttCompteBalance;
var nttCompteBalanceDetail = require( path.join(__dirname,'../server/omodels')).nttCompteBalanceDetail;




// nttcomptebalances


nttcomptebalancedetailRouter.get('/nttcomptebalancedetails', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    console.log('Requesting a specific id: ', req.params.id);
    //  var _comptenumber = objqueriesparams.getbyid(req.params.id)
    dataservice.index(req.params.id,
      function (err, result) {
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
            res.status(200).json(
              {
                object: 'nttcomptebalancdetail:',
                CompteBalancedetailData: result

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

nttcomptebalancedetailRouter.post('/nttcomptebalancedetails', function (req, res, next) {
  var requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    console.log('Requesting a specific id: ', req.params.id);

    dataservice.createComptebalanceDetail(requestBody, function (err) {

      if (!err) {

        res.status(201).end(`Successfully created obj with primary compte number:  ${req.params.id}`);
      }
    });
  }
  else {
    res.status(403).send(`Error while saving obj with primary obj number: ${req.params.id}`);
  }
});

nttcomptebalancedetailRouter.delete('/nttcomptebalancedetails/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  var requestBody = req.body;
  console.log('Deleting obj  with compte number: ' + req.params.id);
  dataservice.detelecomptebalancedetail(req.params.id)
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

          if (res != null) {
            res.send(`Successfully Deleted nstbalanceinput with compte number: ${req.params.id}`);
          }
          return next();
        }
      }
    });
});

nttcomptebalancedetailRouter.put('/nttcomptebalancedetails/:id', function (req, res, next) {
  // console.log(req.url + ' : querying for ' + req.params.NumCompte);
  var requestBody = req.body;

  dataservice.editcomptebalanceDetail(requestBody, req.params.id,
    function (err, data) {
      if (err) {
        return next(err);
      } else {
        if (res !== null) {
          res.status(200).json(data);

        }
      }

    });
});
module.exports = nttcomptebalancedetailRouter;
