// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var fs = require('fs');
var path = require('path');
const Json2csvParser = require('json2csv').Parser;
var buf = new Buffer(1024);

// var abc = ( function(){})


/*const outdirname= path.join(__dirname,'./data/message.json');
const outdirname1= path.join(__dirname,'./data/sidebar.json');
const outdirname2= path.join(__dirname,'./data/getocompte.json');
const outdirname3= path.join(__dirname,'./data/getreference.json');
const outdirname4= path.join(__dirname,'./data/getostblarea.json');
const outdirname5= path.join(__dirname,'./data/getostableauposte.json');
const outdirname6= path.join(__dirname,'./data/getotableauposte.json');
const outdirname7= path.join(__dirname,'./data/sidebar.json');*/

//nstbalanceinput /nstbalance

var inFilename = path.join(__dirname, './data/source/balancepassif.json');
var inJSON = fs.readFileSync(inFilename, 'utf8');
inJSON = JSON.parse(inJSON);
const fields = ['_oexerccompta_id', '_oreference_id', '_otableauposte_id', 'SoldeDebit', 'SoldeCredit'];
var outFilename = path.join(__dirname, './data/target/balancepassif.csv');
const json2csvParser = new Json2csvParser({ fields });
const csv = json2csvParser.parse(inJSON);
fs.writeFile(outFilename, csv, function (err) {
  if (err) throw err;
  console.log('file saved');
})
