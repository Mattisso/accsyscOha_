/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as path from 'path';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();



const opn = require('opn');
const logger = require('morgan');
 const cors  = require('cors');
// import * as dotenv from 'dotenv';
// var webpack = require('webpack');
// var config = require('../webpack.config.dev');
// const  logger = morgan();
// const Cors = cors();
const app = express();
const DIST_FOLDER = path.join(process.cwd(), 'dist');
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
const port = process.env.PORT || 3000;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

// var setRoutes= require('./routes/api-routes');
const setRoutes = require(path.join(__dirname, '../server/routes/index'));
const users = require(path.join(__dirname, '../server/routes/users'));
// --path.join(__dirname, '../client/index.html'));

const  bodyParser = require('body-parser');
app.use(logger('combined'));
app.use(logger('dev'));
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
require(path.join(__dirname, '../server/config/ohadb')).connectserver();
app.use(cors());



// const compiler = webpack(config);

app.use(function (req, res, next) {
  // set headers to allow cross origin request.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// import  { balancesheetupload } require( './routes/balancesheetupload'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
app.use(express.static(path.resolve(__dirname, '../public')));
// Server static files from /browser
app.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));

/*
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
*/
app.use(setRoutes);
app.use('/users', users);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});



// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});



app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    opn(`http://localhost: ${port}`);
  }
});
