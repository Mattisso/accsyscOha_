"use strict"

var Models = require('../../omodels');
module.exports = {


  popular: function (callback) {
    Models.oTableauPoste.find({}, {},
      function (err, otableaupostes) {

        if (err) throw err;
        callback(null, otableaupostes);
      }
    )
  },

  GetOtableauposte: function (model, callback) {

     {
      Models.oTableauPoste.findOne({_id : model._otableauposte_id})
        .select('TableauName  tableauLongName')
        .exec(function (err, otableauposte) {
          if (err) throw err;
          callback(null, otableauposte);
        });
    }


  }
};
