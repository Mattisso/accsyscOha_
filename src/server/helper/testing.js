
//var path = require('path');
//var Models = require(path.join(__dirname,'../omodels/index'));
"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */



var fs = require("fs");
var path = require('path');
var options= require('./objQueriesParams');

var Models = require('../omodels');

var data= require('./models').Nttcomptebalacedetail

var opts=require('./objQueriesParams')
require('../config/ohadb').connectserver()

  var  _oexerccompta_id = '5aee0f0023b8a2227003e7b0',
  _otableauposte_id = '5aee0eff23b8a2227003e7ab',
  _oreference_id = '5aee0efe23b8a2227003e728'


  var qry = {
      '$and': [ {
        '_oexerccompta_id': _oexerccompta_id
      },
      {
        '_otableauposte_id': _otableauposte_id
      }, {
        '_oreference_id': _oreference_id
      }
      ]
    }
/*
    Models.nttCompteBalance.findOne({_id: '5aee117f5058311d84641b3d'}).populate('nttcomptebalancedetails').exec(function(err, obtableaupostes) {

      console.log(JSON.stringify(obtableaupostes))
    })*/

   //  console.log(data.getqycomptenumber('25'))
   //console.log(qry);

    /*data.searchBy('5aee0f0023b8a2227003e7b0','5aee0eff23b8a2227003e7ab','5aee0efe23b8a2227003e72a', function(err, docs){

      if (err) throw err;


      console.log(docs);
      process.exit(0)})*/
// console.log(data.getqycomptenumber(options.getcompteNumberBy('25')))
/*
function compte(){

 data.getcompteNumberBy(options.getcompteNumber('25'))
 .exec(function(err,result){
   if (err)
   throw err;
   //  console.log(result)
 });

}*/

/*
data.getcompteNumberBy(options.getcompteNumber('25')
  , function(err, ocompte){
    var compteid={};
    if (err) throw err;

     compteid['_ocompte_id'] = ocompte._id

console.log(compteid)
  })

*/

/*
data.getById('5aee117f5058311d84641b3d', function(err, docs){
  if (err) throw err;
  console.log(JSON.stringify(docs));
  process.exit(0)})
*/

/*
  data.index(function(err, docs){
    if (err) throw err;
    console.log(JSON.stringify(docs));
    process.exit(0)})
*/

/*
data.index(function(err, docs){
  if (err) throw err;
  console.log(JSON.stringify(docs));
  process.exit(0)})*/
/*
    data.index(function(err, docs){
      if (err) throw err;
      console.log(JSON.stringify(docs));
      process.exit(0);
    })
*/

var obj = {
  prop: 'Some property',
  getProp: function () {return this.prop}
  };
 console.log(obj.getProp());
