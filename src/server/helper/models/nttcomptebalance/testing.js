// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');


var _ = require('lodash');
 const detaildata= require('../nttcomptebalance')

/*eslint-disable no-unused-vars */
require('../../../config/ohadb').connectserver()
var Models = require('../../../omodels');

var dataservice=require('../nttcomptebalance')
/*
console.log(JSON.stringify(dataservice.Nttcomptebalance.init().toInitializeInstance(detaildata.Createcomptebalancedata.CompteBalanceData)))
*/


console.log(JSON.stringify(dataservice.Nttcomptebalance.init().BuildupdateCompteBalance(detaildata.Editcomptebalancedata.CompteBalanceData)))
