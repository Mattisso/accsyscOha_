"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
import * as dotenv from 'dotenv';
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = require('bluebird');


//function db(callback){

var options = {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  promiseLibrary: require('bluebird')
};
var gracefulShutdown;
var dbURI = 'mongodb://localhost:27017/ohaDB';  // 'mongodb://admin:admin@ds137882.mlab.com:37882/ohadadb'
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://admin:admin@ds137882.mlab.com:37882/ohadadb';
}


mongoose.connect(dbURI, options);
var db = mongoose.connection;
db.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
db.on('error', function (err) {
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
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);

    //  callback(null, 'done')
  });
});


//}
// BRING IN YOUR SCHEMAS & MODELS

  require('./ocompte'),
  require('./oreference'),
  require('./nstbalanceinput'),
  require('./nstBalance'),
  require('./nttBalance'),
  require('./nttcomptebalance'),
  require('./nttcomptebalancedetail'),
  require('./oexerccompta'),
  require('./oexercice'),
  require('./orptgroupingA'),
  require('./orptgroupingB'),
  require('./orptgroupingC'),

  require('./ostableauposte'),
  require('./ostblarea'),
  require('./otableauPoste'),
  require('./otableaugestion')
  require('./user')
