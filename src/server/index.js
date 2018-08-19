
"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express= require('express');
var logger = require('morgan');
var cors = require('cors')


var bodyParser = require('body-parser')
var  app =express();
app.use(logger('combined'));
app.use(logger('dev'));
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
const path = require('path');
require('./config/ohadb').connectserver()
app.use(cors());
// headers and content type
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
var nstbalanceinputs = require('./routes/nstbalanceinputs');
var nstbalances = require('./routes/nstbalances');
var users = require('./routes/users');
// import  { balancesheetupload } from './routes/balancesheetupload'
  var fileroute = require('./routes/oda-upload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// parse various different custom JSON types as JSON
app.use(express.static(path.resolve(__dirname, 'public')));



/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

app.use('/api', nstbalanceinputs);
app.use('/api', users);
app.use('/api', fileroute);
app.use('/api', nstbalances);

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});
*/

app.listen(3000, () => {
  console.log('listening on port 3000..');
})

/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});*/
