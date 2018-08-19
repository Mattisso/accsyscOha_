/*function zipCode(code, location) {
  let _code = code;
  let _location = location || '';
  return {
  code: function () {
  return _code;
  },
  location: function () {
  return _location;
  },
  fromString: function (str) {
  let parts = str.split('-');
  return zipCode(parts[0], parts[1]);
  },
  toString: function () {
  return _code + '-' + _location;
  }
  };
  }
  const princetonZip = zipCode('08544');
 console.log(princetonZip.toString()); //-> '08544-3345'
*/

 // getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');
var async = require('async');

require('../config/ohadb').connectserver()
var _ = require('lodash');
const detaildata= require('../helper/models').Nttcomptebalace

const data1= require('./nttcomptebalance')

var  data= require('../helper/models').Nstbalanceinput
var objqueriesparams = require('../helper/objQueriesParams')

/*eslint-disable no-unused-vars */

// var Models = require('../omodels');

 //var refcode ='24';
/*detaildata.popular(function(err, docs){
         if (err) throw err;

      console.log(JSON.stringify(docs))
});
*/
/*
"_oexerccompta_id": '5aee0f0023b8a2227003e7b0'',
    "_otableauposte_id": '5adcf3ab21540d1de82b4d8a',
    "_oreference_id": '5adcf3aa21540d1de82b4ccf',*/
/*
    data.findByid('5aee112a74a15d12f4cb66dd',
      function(err, docs){
         if (err)
         {
           throw err
         }
         else {
var obj;
          obj=docs;
         //console.log(JSON.stringify(docs));


         }

     //  console.log(JSON.stringify(result));
     })


     data.findBytestNumCompte('220100',
     function(err, docs){
        if (err)
        {
          throw err
        }
        else {

       //   obj=docs;
        console.log(JSON.stringify(docs));


        }

    //  console.log(JSON.stringify(result));
    })*/
/*

function randoM(parm1=null, parm2=null, parm3=null) {
  var obj;
  data.findByNumCompte(parm1,
 function(err, docs){
    if (err)
    {
      throw err
    }
    else {

     obj=docs;
   // console.log(JSON.stringify(docs));


    }

//  console.log(JSON.stringify(result));
})
}
*/
function test()

{
  var CompteNumber= 'CompteNumber';
  return objqueriesparams.objQueriesParams.getObjectBy(CompteNumber,'25')

}

console.log(test())
//5adcf3ac21540d1de82b4d90	5adcf3ab21540d1de82b4d8d	5adcf3aa21540d1de82b4ceb

//5adcf3ac21540d1de82b4d90	5adcf3ab21540d1de82b4d8d	5adcf3aa21540d1de82b4cf3



//console.log(randoM('5aee0f0023b8a2227003e7b0','5aee0eff23b8a2227003e7ad','5aee0efe23b8a2227003e70b'))


