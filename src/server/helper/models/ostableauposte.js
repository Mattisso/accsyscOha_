"use strict"

var Models = require('../../omodels');

module.exports = {
  popular: function (callback) {
    Models.oStableauPoste.find({}, {},
      function (err, ostableaupostes) {

        if (err) throw err;
        callback(null, ostableaupostes);
      }
    )
  },
  getostableauposte: function (ostableauposte = null, callback) {
    if (ostableauposte !== undefined && ostableauposte !== null) {
      Models.oStableauPoste.findOne(ostableauposte)
        .select('StableauName,StbleauLongName')
        .exec(function (err, ostableaupostes) {
          if (err) throw err;
          callback(null, ostableaupostes);
        });

    }
    else {
      return new Error(`no Compte Number Matching  ${ostableauposte}`)
    }

  }

};
