"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var dotenv= require('dotenv');
var  express= require('express');
var  app = express();
var logger = require('morgan');
var cors = require('cors')
//var setRoutes= require('./routes/api-routes');
var setRoutes= require('./routes');
dotenv.load({ path: '.env' });
const port =process.env.PORT || 3000;

var bodyParser = require('body-parser')
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

// import  { balancesheetupload } from './routes/balancesheetupload'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
app.use(express.static(path.resolve(__dirname, '../public')));



/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

app.use(setRoutes);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port  ${port}..`);
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
