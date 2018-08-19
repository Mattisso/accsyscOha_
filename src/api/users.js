/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');

var express = require('express');

var userRouter = express.Router();

var userCtrl= require( path.join(__dirname,'../server/controllers/users'));



//users
  userRouter.get('/api/users', function(req, res, next){
    return userCtrl.getAll(req, res, next);
  }
  );

  userRouter.post('/api/users/login', function(req, res, next){
    return userCtrl.getUserLogin(req, res, next);
  });

  userRouter.get('/api/users/count',function (req, res, next) {
    return  userCtrl.getCount(req, res, next)
    });
  userRouter.get('/api/users/:id',function (req, res, next) {
    return  userCtrl.getById(req, res, next)
    });

    userRouter.post('/api/users/register', function (req, res, next) {
      return  userCtrl.register(req, res, next)
    });
    userRouter.put('/api/users/:id', function (req, res, next) {
    return  userCtrl.edit(req, res, next);
    });
    userRouter.delete('/api/users/:id', function (req, res, next) {
      return  userCtrl.del(req, res, next);
    });
    module.exports = userRouter;
