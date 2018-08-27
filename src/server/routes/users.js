/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var express = require('express');

var userRouter = express.Router();
var User = require('../omodels').User;
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

// var userCtrl= require('../controllers/users');
var dataservice = require('../helper/models/user/userCtrl');



//users
  userRouter.get('/users', function(req, res, next){
    dataservice.index(function (err, result) {
      if (err) {
        return next(err);

      }
      if (res != null) {
        //    req.result = result
        res.json(req.result = result);
      }
    });
  }
  );
  userRouter.post('/users/login',function (req, res, next) {
    User.getAuthenticated(req.body.username, req.body.password, function (err, user, reason) {
      if (err)
        throw err;

      // login was successful if we have a user
      if (user) {
        // handle login success
        const payload = {
          id: user.id,
          username: user.username,
          role: user.role
        };

        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      }
      else {
        return res.status(403).send({
          success: false,
          message: 'Access Denied'
        });
      }

      // otherwise we can determine why we failed


    });

  });
  userRouter.get('/users/count',function (req, res, next) {
    return  dataservice.getCount(req, res, next);
    });
  userRouter.get('/users/:id',function (req, res, next) {

    console.log(req.url + ' : querying for ' + req.params.id);
    if (req.params.id) {
      console.log('Requesting a specific id: ', req.params.id);
      dataservice.getById(req.params.id,
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

              //  req.result=result;
              res.status(200).json(
                {
                  object: 'user:',
                  userdata: result

                }
              );
              return next();

            }

          }


        });
    }
    else {
      return next();
    }


 //   return  dataservice.getById(req, res, next)
    });

    userRouter.post('/users/register', function (req, res, next) {

      var userParam = req.body;

  User.findOne(
    { username: userParam.username }, {},
    function (err, user) {
      if (err) {
      next(err);
        // return next((err.name + ': ' + err.message))
      }

      if (user) {
        // username already exists
        res.status(403).send(`Username: ${userParam.username}  is already taken`);
      }
      else {
        dataservice.createUser(userParam, function (err) {
          if (!err) {

            res.status(201).json(userParam);
          }
        });
      }

      });

   //   return  dataservice.register(req, res, next)
    });
    userRouter.put('/api/users/:id', function (req, res, next) {
    return  dataservice.edit(req, res, next);
    });
    userRouter.delete('/api/users/:id', function (req, res, next) {
      return  dataservice.del(req, res, next);
    });
    module.exports = userRouter;
