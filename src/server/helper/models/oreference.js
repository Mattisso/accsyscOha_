"use strict"

var Models = require('../../omodels');


module.exports = {

  popular: function (callback) {

      Models.oReference.find({}, {},
      function (err, oreferences) {
        if (err) throw err;
        callback(null, oreferences);

      });


  },
  getOreference : function (model, callback) {
      Models.oReference.findOne({_id: model._oreference_id})
      .select('RefCode  Description')
      .exec(function (err, oreferences) {
        if (err) throw err;
        callback(null, oreferences)
       });
      }



}


