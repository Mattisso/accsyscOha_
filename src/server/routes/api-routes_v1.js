/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');
const destinationfolder = path.join(__dirname, '../../public/odaimportfolder/');

var express = require('express');
var async = require('async')
var router = express.Router();
var balanceinputCtrl= require('../controllers/balanceinputsdataservice');
var nsbalanceCtrl= require('../controllers/nstbalances');
var ntbalanceCtrl= require('../controllers/nttbalances');
var userCtrl= require('../controllers/users');
var fileUploadCtrl= require('../controllers/oda-upload');
var comptebalanceCtrl= require('../controllers/nttcomptebalances');
var comptebalancedetailCtrl= require('../controllers/nttcomptebalancedetails');
var Models= require('../omodels')

//const nstbalanceinputs = new  NstablanceinputCtrl();


//nstbalanceinputs
router.get('/api/nstbalanceinputs', function(req, res, next){

  balanceinputCtrl.list(Models.nstBalanceInput, Response, next)
 // return balanceinputCtrl.getAll(req, res, next);
}
);
router.get('/api/nstbalanceinputs/:id',function (req, res, next) {


  return  balanceinputCtrl.getById(req, res, next)
  });

  router.post('/api/nstbalanceinputs', function (req, res, next) {
    return  balanceinputCtrl.create(req, res, next)
  });
  router.put('/api/nstbalanceinputs/:id', function (req, res, next) {
  return  balanceinputCtrl.edit(req, res, next);
  });
  router.delete('/api/nstbalanceinputs/:id', function (req, res, next) {
    return  balanceinputCtrl.del(req, res, next);
  });


  function toBalanceinput(body) {

    return new Models.nstBalanceInput(
        {
          NumCompte: body.NumCompte,
          IntitulCompte: body.IntitulCompte,
          SoldeDebit: body.SoldeDebit,
          SoldeCredit: body.SoldeCredit

        });
  }

  //nstbalances
router.get('/api/nstbalances', function(req, res, next){
  return nsbalanceCtrl.getAll(req, res, next);
}
);
router.get('/api/nstbalances/:id',function (req, res, next) {
  return  nsbalanceCtrl.getById(req, res, next)
  });

  router.post('/api/nstbalances', function (req, res, next) {
    return  nsbalanceCtrl.create(req, res, next)
  });
  router.put('/api/nstbalances/:id', function (req, res, next) {
  return  nsbalanceCtrl.edit(req, res, next);
  });
  router.delete('/api/nstbalances/:id', function (req, res, next) {
    return  nsbalanceCtrl.del(req, res, next);
  });


    //nttbalances
router.get('/api/nttbalances', function(req, res, next){
  return ntbalanceCtrl.getAll(req, res, next);
}
);
router.get('/api/nttbalances/:id',function (req, res, next) {
  return  ntbalanceCtrl.getById(req, res, next)
  });

  router.post('/api/nttbalances', function (req, res, next) {
    return  ntbalanceCtrl.create(req, res, next)
  });
  router.put('/api/nttbalances/:id', function (req, res, next) {
  return  ntbalanceCtrl.edit(req, res, next);
  });
  router.delete('/api/nttbalances/:id', function (req, res, next) {
    return  ntbalanceCtrl.del(req, res, next);
  });

  //users
router.get('/api/users', function(req, res, next){
  return userCtrl.getAll(req, res, next);
}
);

router.post('/api/users/login', function(req, res, next){
  return userCtrl.getUserLogin(req, res, next);
});

router.get('/api/users/count',function (req, res, next) {
  return  userCtrl.getCount(req, res, next)
  });
router.get('/api/users/:id',function (req, res, next) {
  return  userCtrl.getById(req, res, next)
  });

  router.post('/api/users/register', function (req, res, next) {
    return  userCtrl.register(req, res, next)
  });
  router.put('/api/users/:id', function (req, res, next) {
  return  userCtrl.edit(req, res, next);
  });
  router.delete('/api/users/:id', function (req, res, next) {
    return  userCtrl.del(req, res, next);
  });


  //upload
router.post('/api/upload', function(req, res){
  return fileUploadCtrl.fileUpload(req, res);
}
);
//nttcomptebalance
router.post('/api/comptebalances', function(req, res, next){
  return comptebalanceCtrl.create(req, res,next);
}
);

router.get('/api/comptebalances/:id', function(req, res, next){
  return comptebalanceCtrl.getById(req, res,next);
}
);
router.get('/api/comptebalances', function(req, res, next){
  return comptebalanceCtrl.getAll(req, res,next);
}
);

router.put('/api/comptebalances/:id', function (req, res, next) {
  return  comptebalanceCtrl.edit(req, res, next);
  });
  router.delete('/api/comptebalances/:id', function (req, res, next) {
    return  comptebalanceCtrl.del(req, res, next);
  });

// fileUploadCtrl.cleanFolder(destinationfolder)

//nttcomptebalanceDetail
router.get('/api/comptebalancedetails', function(req, res, next){
  return comptebalancedetailCtrl.getAll(req, res,next);
}
);
router.put('/api/comptebalancedetails/:id', function (req, res, next) {
  return  comptebalancedetailCtrl.edit(req, res, next);
  });
  router.delete('/api/comptebalancedetails/:id', function (req, res, next) {
    return  comptebalancedetailCtrl.del(req, res, next);
  });

module.exports = router;
