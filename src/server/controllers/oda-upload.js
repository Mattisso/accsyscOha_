// import'whatwg-fetch'
'use strict';

/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

const  del = require('delete');
const path = require('path');
var fs = require('fs');
// const uploadfolder = path.join(__dirname, './odaimportfolder/');
const multer = require('multer');
const destinationfolder = path.join(__dirname, '../../public/odaimportfolder/');

// let nstbalanceinput = require('../load/nstbalanceinput');


 // var uploadfileCrl= require('../../api/fileuploads');

//  cleanFolder(destinationfolder);





let  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationfolder);
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx|html|txt)$/)) {
      var err = new Error();
      err.code='filetype';
      return cb(err);

    } else {
    // To accept the file pass `true`, like so:
    const datetimestamp = Date.now();
    cb(null,  datetimestamp + '-' +file.originalname )/*+ '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])*/;
   }
  }
  /*fileFilter:fileFilter,
  filename: filename*/
});

let upload = multer({
  storage: storage
,limits: {fileSize: 10000000 }

}).single('ohafile');



module.exports.cleanFolder = function (folderPath) {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);

  if (!fs.existsSync(destinationfolder)) fs.mkdirSync(destinationfolder);
};

// cleanFolder(destinationfolder);
// optional: clean all data before start




module.exports.fileUpload = function (req, res) {   //  cleanFolder(destinationfolder);

  upload(req,res,function(err){
console.log(req.file)
    if(err){
  //  return res.status(501).json({error:err});

        if(err.code==='LIMIT_FILE_SIZE'){
            res.json({success: false, message: 'File size is too large. Max limit is 10MB'});
        } else if (err.code==='filetype'){
            res.json({success: false, message: 'file type is invalid. Must be .xls|txt|html'})
        } else{
            console.log(err);
            res.json({sucess: false, message: 'File was not able to be uploaded'})
        }

    }
   // return res.json({originalname:req.file.originalname, uploadname: req.file.filename});
    /** Multer gives us file info in req.file object */
   else {

        if(!req.file){
            res.json({success:false, message: "No file was selected"});
            return;
        } else {


            res.json({success: true, message: 'File was uploaded!'})


        }

    }


})
  };

  var filedestination= path.resolve(__dirname + '../../client/app/fileuploads/file-upload.component.html');

  module.exports.get= function (req, res) {
  try {
    res.sendFile(filedestination, { title: 'Express' });
    } catch (err) {

  res.sendStatus(400);
    }
};

