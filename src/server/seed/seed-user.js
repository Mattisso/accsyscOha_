
'use strict'
/* eslint-disable  no-console */
require('../config/ohadb').connectserver()
var async = require('async');
var path = require('path');
var Models = require(path.join(__dirname, '../omodels/index.js'));

async.series({
  /*removeUser: function (callback) {
    Models.User.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'users Removed!')
      }, 200);
    })
  },*/

InserUser: function (callback) {

  var users = [];

  var user = new Models.User({
    username: 'akoli',
    role: 'user',
    password: 'Password123'
  })
  // Add newly create User model to 'users' array
  users.push(user);


  async.eachSeries(

    users,

    function (user, userSavedCallBack) {

      user.save(function (err) {

        if (err)
          throw err;


        // attempt to authenticate user
        Models.User.getAuthenticated('akoli', 'Password123', function (err, user, reason) {
          if (err)
            throw err;

          // login was successful if we have a user
          if (user) {
            // handle login success
            console.log('login success');
            return;
          }

          // otherwise we can determine why we failed
          var reasons = Models.User.failedLogin;
          switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
              // note: these cases are usually treated the same - don't tell
              // the user *why* the login failed, only that it did
              break;
            case reasons.MAX_ATTEMPTS:
              // send email or otherwise notify user that account is
              // temporarily locked
              break;
          }
        });
        userSavedCallBack();
      });

    },

    function (err) {

      if (err)
        throw (err);


      setTimeout(function () {
        callback(null, `Finished users in seeding ${users.length} records inserted`)
      }, 200);
    });

}

},

  function (err, results) {

    console.log("\n\n--- Database seed progam completed ---");

    if (err) {
      console.log("Errors = ");
      throw (err);
    } else {
      console.log("Results = ");
      console.log(results);
    }

    console.log("\n\n--- Exiting database seed progam ---");
    // Exit the process to get back to terrminal console
    process.exit(0);
  }
);
