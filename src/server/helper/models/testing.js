

"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');


require('../../config/ohadb').connectserver()
var _ = require('lodash');
var objQueriesParams=require('../objQueriesParams')

var _createcompte= require('./createcomptebalance');
/*

async.series([
function (callback) {
  */
  var model = {
    _oexerccompta_id: '5aee0f0023b8a2227003e7b0',
    _otableauposte_id: "5aee0eff23b8a2227003e7ad",
    _oreference_id: "5aee0efe23b8a2227003e70b",

   };
   _createcompte(function(err, viewModel) {
var param= objQueriesParams.getid(model._oexerccompta_id)//getExerccomptaBy('2006')
//.log(param)
if (err) throw (err)

var objCh = _.find(viewModel.Oexerccompta, {id:'5aee0f0023b8a2227003e7b0'})


//var getparm = oo.ocompte_id,


console.log(objCh)
   })
/*
  }],

  function (err, results) {
              if (err) {
                  console.dir(err)
              } else {
                  console.log(results);
              }
              process.exit(0);
          }

  );*/

