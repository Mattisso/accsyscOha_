
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

var ogroupingBdata= require('../helper/ogroupingAdata')




const outdirname= path.join(__dirname,'./data/source/ogroupingA.json');
 ogroupingBdata.populate(function (err, docs){
    if (err) console.dir(err)



         var filename =JSON.stringify(docs);


         fs.writeFile(outdirname,filename,  function(err) {
             if (err) {
                return console.error(err);
             }
             console.log("Data written successfully!");
             process.exit(0);

      });

  });


