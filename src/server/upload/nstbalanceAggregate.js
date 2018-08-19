
// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var fs = require("fs");
var path = require('path');

var _ = require('lodash');

/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var Models = require('../omodels');

const outdirname= path.join(__dirname,'./data/source/nstbalanceAggregate.json');


  Models.nstBalance.aggregate(
    [
       {
         $group : {

            _id : { _oexerccompta_id:  '$_oexerccompta_id',  _oreference_id: "$_oreference_id", _otableauposte_id:'$_otableauposte_id'},
            totalSoldeDebit: { $sum: "$SoldeDebit" },
            totalSoldeCredit: { $sum: "$SoldeCredit" },
            count: { $sum: 1 }
         }
       }
    ],
  //  {allowDiskUse : true},
    function(err, docs){
        if (err) console.dir(err)

        var obj= {}, arr=[];
        _.forEach(docs, function(o){

          obj={
            _oexerccompta_id: o._id['_oexerccompta_id'],
            _oreference_id :o._id['_oreference_id'],
            _otableauposte_id: o._id['_otableauposte_id'],
            SoldeDebit: o.totalSoldeDebit,
            SoldeCredit:o.totalSoldeCredit,
            count: o.count   }

            arr.push(obj);


          });


        //   console.log(viewModel)

        var filename =JSON.stringify(arr);


        fs.writeFile(outdirname,filename,  function(err) {
            if (err) {
               return console.error(err);
            }
            console.log("Data written successfully!");

    process.exit(0);
     });
        });
