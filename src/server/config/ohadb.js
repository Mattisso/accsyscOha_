"use strict"

/* eslint-disable  no-console */
var ohadbconn = (

  function (){

    var mongoose = require( 'mongoose' );
//var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = require('bluebird');
var config=require('./database');

var buildoption = function(){

  var options = {
    useNewUrlParser: true,
   // useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    promiseLibrary: require('bluebird')
  };

  return options;

};

var buildbURI= function () {
  var dbURI = config.db_dev;
  if (process.env.NODE_ENV === 'production') {
      dbURI = config.DB_CONN;
  }
return    dbURI;

}

 var connectserver = function (url, option) {
 url = buildbURI();
option = buildoption();
var gracefulShutdown;

    mongoose.connect(url,option);
    var db = mongoose.connection;
    db.on('connected', function () {
    console.log('Mongoose connected to ' + url);
    });
    db.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
    });
  db.on('disconnected', function () {
    console.log('Mongoose disconnected');
    });

      gracefulShutdown = function (msg, callback) {
     db.close(function () {
      console.log('Mongoose disconnected through ' + msg);
      callback();
      });
      };
      // For nodemon restarts
      process.once('SIGUSR2', function () {
      gracefulShutdown('nodemon restart', function () {
      process.kill(process.pid, 'SIGUSR2');
      });
      });
      // For app termination
      process.on('SIGINT', function() {
      gracefulShutdown('app termination', function () {
      process.exit(0);
      });
      });
      // For Heroku app termination
      process.on('SIGTERM', function() {
      gracefulShutdown('Heroku app shutdown', function () {
      process.exit(0);

    //  callback(null, 'done')
      });
      });

  }

  return{
connectserver : connectserver
  }


  })();



module.exports={
connectserver: ohadbconn.connectserver

}




//function db(callback){



//console.log(otableaupostedata);
// Connection URL




