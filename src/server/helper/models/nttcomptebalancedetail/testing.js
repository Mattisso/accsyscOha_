// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');
var odahelper = require('../..')
var test= require('./test5')

var _ = require('lodash');
const detaildata = require('./nttcomptebalancedata')

/*eslint-disable no-unused-vars */
require('../../../config/ohadb').connectserver()
//var Models = require('../../../omodels');
var detailCtrl = require('./nttComptebalancedetailCtrl')

var baserepos = require('../../../SharedKernel')

var dataservice = require('../nttcomptebalancedetail')

var mergeostableauposte = [], obj, data;
var requestparamid = detaildata.CompteBalanceData._id;

// var _nttcomptebalance_id = ['5aee117f5058311d84641b3c']
test.editcomptebalanceDetail(detaildata,requestparamid,function(err,docs) {
if(err) {
  throw (err)
}
else {
  console.log(docs)
}

})
