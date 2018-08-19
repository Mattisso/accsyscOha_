//import'whatwg-fetch'
"use strict"

/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var async = require('async')
var User = require('../omodels').User
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

var _ = require('lodash');
// var config = require('../../server/config/database');
/*
var expressJwt = require('express-jwt');
router.use(
  expressJwt({ secret:  config.JWT_SECRET })
  .unless({ path: '/login'})
);

router.use((err, req, res, next) => {
if (err.name === 'UnauthorizedError') {
 return next(res.status(401).send({ error: err.message }));
}
});*/

// var userService = require('../../api/users');

module.exports.getAll = function (req, res, next) {
  // Get all
  User.find({}, {},
    // sort({ userName: 'desc' },
    function (err, docs) {
      if (err) {
        return next();
      }
      else {
        // return users (without hashed passwords)
        /*   docs = _.map(docs, function (result) {

             return res.status(200).json(_.omit(result, 'hash'));
           });*/
        res.status(200).json(docs);
      }


    })
  // return  userService.getAll(req, res, next)
};

module.exports.getById = function (req, res, next) {
  console.log('Requesting a specific User');
  User.findById(req.params.id,
    function (err, user) {
      if (err) {
        next(err);
        //   return next();
      } else {
        res.status(200).json(_.omit(user, 'hash'));

      }

    })
  // return userService.getById(req, res, next)

};

module.exports.getCount = function (req, res, next) {

  User.count({}, function (err, count) {
    if (err)
    next(err);
    res.status(200).json(count);

  });
  // return userService.count(req, res, next)

};

module.exports.getUserLogin = function (req, res, next) {
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

}

module.exports.register = function (req, res, next) {
  // insert
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
        createUser();

      }


    });

  function createUser() {
    var arr = []
    var obj = new User(userParam);


    if (!(obj.username && obj.password)) {
      ({ error: 'There was an error!' });
    }
    else {
      //   set user object to userParam without the cleartext password
      //var user = _.omit(obj, 'password');

      //   add hashed password to user object
      //    user.hash = bcrypt.hashSync(obj.password, 10);

      arr.push(obj)
    }

    async.eachSeries(

      arr,

      function (obj, SavedCallBack) {
        obj.save(function (err) {
          if (err)
          {
            if (err.code === 11000) {
              //  return SavedCallBack(err)
              return res.status(500).json({
                error: 'Error  inserting duplicate key.'
              })

            } else {
              //  return SavedCallBack(err)
              return res.status(500).json({
                error: 'Error inserting new record.'
              })

            }

          }


          else {
            User.getAuthenticated(obj.username, obj.password, function (err, user, reason) {
              if (err)
              {
                throw err;

              }

              // login was successful if we have a user
             else if (user) {
                // handle login success
                res.status(200).send('login success')
              //  console.log('login success');
              //  SavedCallBack();
              }
              else {
                var reasons = User.failedLogin;
                switch (reason) {
                  case reasons.NOT_FOUND:
                  case reasons.PASSWORD_INCORRECT:
                    break;
                  case reasons.MAX_ATTEMPTS:
                    break;

                }
                SavedCallBack();
              }



            });


          //   SavedCallBack();
          }

        })
      },
      function (err) {
        if (err) return next(err);
     res.status(200).send(`Username:  ${obj.username}  entered successfully`)
        // return;   // res.json(obj);
      });
  }
  /*var userinfo = req.body;
 userService.create(userinfo, function (err, user) {
  if (err) return next(err);

  return res.render('user', user);
})*/

};

module.exports.edit = function (req, res, next) {
  User.findById(req.params.id,
    function (err, result) {
      if (err) {

        return next(err.name + ': ' + err.message);
      } else if (result.username !== req.params.username) {
        User.findOne({ username: req.params.username },
          function (err, result) {
            if (err) {
              return next(err.name + ': ' + err.message);

            }
            else if (result) {
              // authentication successful
              res.status(200).json(`Username:  ${req.params.username} is already taken`)


              // res.json(result)
            }
            else {
              // authentication failed
              updateUser();
              //    res.json(deferred.resolve());
            }



          });

      } else {
        // user not found
        updateUser();
        //   res.json(deferred.resolve(result));
      }


    });
  function updateUser() {
    // fields to update
    var set = {
      username: req.params.username,
      role: req.params.role

    };

    // update password if it was entered
    if (req.params.password) {
      set.hash = bcrypt.hashSync(req.params.password, 10);
    }

    User.update(
      { _id: req.params.id },
      { $set: set },
      function (err, result) {
        if (err) return res.status(400).json(err.name + ': ' + err.message);
        res.status(200).json(`Username:  ${result.username}  updated successfully`)

      });
  }



};

module.exports.del = function (req, res, next) {
  console.log('Deleting a user');
  User.findByIdAndRemove(req.params.id, req.body, function (err) {
    if (err) return next(err);
    res.status(200).send(`user deleted successfully`);
  });

};
