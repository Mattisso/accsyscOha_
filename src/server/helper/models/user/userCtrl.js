/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();
var url = require('url');
var objqueriesparams= require('../../objQueriesParams')
var baserepos=require('../base')
// var nstBalanceInput = require('../../../omodels/index').nstBalanceInput;
var userModel = require('./user')
var Models = require('../../../omodels');

var async = require('async')
//var balanceinputdata = require('../helper/models/nstbalanceinput.v1')

function SearchBy(_param) {
  var getquery = Models.User.findOne(({_id: _param}), {});
  return getquery;
}




module.exports = {

  index: function (callback) {
  var getquery = Models.User.find({}, {}, { sort:{ username: 'desc' } },
  function (err, users) {
    if (err) throw err;
  callback(null, users);
})
},

query_by_arg: function(model, key, value, callback) {
return baserepos.query_by_arg(model, key, value, callback)

},

getCount : function (callback) {

  User.count({}, function (err, count) {
    if (err) throw err
callback(null, count)

  });
  // return userService.count(req, res, next)

},
login : function (req, res, next) {
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

},

getById : function (requestparamid,  callback) {
  if (requestparamid) {
    Models.User.findOne({_id : requestparamid},
      function (err, result) {
        if (err) throw err;
          callback(null, result);
        })

      }
},


createUser: function (requestBody, callback) {
  var arr = [];

  var data =  userModel.toinit().toInitializeInstance(requestBody);



   for (var i = 0; i < data._arrusers.length; i++) {
    var obj = new Models.User(data._arrusers[i]);
    if (arr.indexOf(data._arrusers[i].username == -1)) {
      arr.push(obj);

    }

}

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
},

editUser: function (requestBody, requestparamid,callback) {
  // requestBody = req.requestBody;
  var d = new Date();
  var obj = requestBody;

  SearchBy(requestparamid)
 .exec(function (err, data) {
    if (err) {
      return callback(err);
    } else {

            if (data) {
        data.username = obj.username;
        data.role  = obj.role;
        data.passord = obj.password;
        data.ModifiedOn = d;

        data.save(function (err) {
          if (!err) {
            console.log('Successfully updated obj with primary number: ' + obj.username);
            data.save();
          } else {
            console.log('err on save');
          }
        });

      }
      //poulate the document with the updated values

      return callback(null, data);


    }
  });

},
deleteUser: function (requestparamid, callback) {
  var _arrusers = [];
  SearchBy(requestparamid)
    .exec(function (err, results) {
      if (err) {
        throw (err)
      }
      else {
        if (!results) {
          return callback(null,

            {
              success: false,
              message: ` item(s) with id : ${requestparamid}  not found.`
            }
          )
        }
        else {
          for (var i = 0; i < results.length; i++) {
            var resultusers = results[i];

            _arrusers.push(resultusers);
          }

          async.each(_arrusers, function (resultusers, callback_s1) {
            resultusers.remove(function (err) {
              if (!err) {
                resultusers.remove();

                callback_s1();
              }
            })

          }, function (err) {

            if (err) {
              throw (err)

            }
            else {
              if (_arrusers.length > 0) {
                callback(null, {

                  Success: true,
                  message: _arrusers.length + ' item(s) was deleted.'

                })


              }
              else if (_arrusers.length == 0) {
                callback(null, `no item(s) with Id :${requestparamid} was found`)
              }

            }
          })

        }

      }
    })

}
}
