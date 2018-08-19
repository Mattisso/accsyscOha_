/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var fs = require("fs");
var path = require('path');
//var ogroupingCdata= require('../helper/otableaupostedata')
var odahelper = require('../helper');

const outdirname= path.join(__dirname,'./otbleaupostdata.json');
odahelper.nstbalanceinput.popular(function (err, docs){
   if (err) throw err;



        var filename =JSON.stringify(docs);


        fs.writeFile(outdirname,filename,  function(err) {
            if (err) {

return console.error(err);
            }
            console.log("Data written successfully!");
            process.exit(0);

     });

 });
