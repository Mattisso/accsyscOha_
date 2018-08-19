

"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');
var options= require('../helper/objQueriesParams');

var data= require('../helper/models').Ocomptes

var populate= require('../helper/populateget')

var opts=require('../helper/objQueriesParams')
require('../config/ohadb').connectserver()
var _ = require('lodash');

var loadobjQueriesparams= require('../helper/loadobjQueriesparams');
var oda= require('../helper/oda');

var objQueriesParams= require('../helper/objQueriesParams')
//const detaildata= require('../helper/models/index').Nttcomptebalace
/*

data.getcompteNumberBy(options.getcompteNumber('25')
  , function(err, ocompte){
    var compteid={};
    if (err) throw err;

     compteid['_ocompte_id'] = ocompte._id

// console.log(compteid)
  })*/


/*
	  function foo(o) {

     var qyr=   data.getcompteNumberBy(options.getcompteNumber(o)
  , function(err, ocompte){
    var compteid={};
    if (err) throw err;

     compteid['_ocompte_id'] = ocompte._id


 //console.log(compteid)
  })
  //return qyr;
     //   console.log("Hello from foo!");
    }

    function caller(f, v) {

        // Call the given function
       f(v);
    }

    function indirectCaller(f, v) {
        // Call `caller`, who will in turn call `f`
        caller(f,v);
    }

    // Do it
  //console.log(indirectCaller(foo,'25')); // alerts "Hello from foo!"


  oda.getcompteNumberBy(indirectCaller(foo,'25'),function(err, ocompte) {
    if (err) throw err;

  //  compteid['_ocompte_id'] = ocompte._id

//console.log(ocompte)

  })*/
/*

  var qyr=   data.getcompteNumberBy(options.getcompteNumber('25')
  , function(err, ocompte){
    var compteid={};
    if (err) throw err;

     compteid['_ocompte_id'] = ocompte._id
    // console.log(compteid)

     oda.getcompteNumberBy(compteid,function(err, ocompte) {
        if (err) throw err;

      //  compteid['_ocompte_id'] = ocompte._id

    // console.log(ocompte)

      })

 //console.log(compteid)
  })*/

/*
  oda.popular(function(err, ocompte) {
    if (err) throw err;

  //  compteid['_ocompte_id'] = ocompte._id

console.log(ocompte)

  })
*/



async.series([
function (callback) {
  var viewModel = {

   };
   loadobjQueriesparams(viewModel, function(viewModel) {
// var param= objQueriesParams.getExerccomptaBy('2006')

var hpcompte= viewModel.objparams.hp_Oexerccompta
console.log(hpcompte)
   })

  }],

  function (err, results) {

              console.log("\n\n--- Database seed progam completed ---");

              if (err) {
                  console.log("Errors = ");
                  console.dir(err)
              } else {
                  console.log("Results = ");
                  console.log(results);
              }

              console.log("\n\n--- Exiting database seed progam ---");
              // Exit the process to get back to terrminal console
              process.exit(0);
          }

  );
