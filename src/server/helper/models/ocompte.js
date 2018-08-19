"use strict"
var Models = require('../../omodels');

module.exports = {

  getcompteNumberBy: function (comptenumber=null) {
    if (comptenumber !== undefined && comptenumber !== null) {
    var getquery=  Models.oCompte.findOne(comptenumber)
      .sort({'CompteNumber' : 1})
        .select('CompteNumber')
return getquery

    }

    else {

      return new Error(`no Compte Number Matching  ${comptenumber}`)
      //console.log( 'no argument was passed')

    }

  },

  popular: function (callback) {

    Models.oCompte.find({}, {},
      function (err, ocomtes) {
        if (err) throw err;
        callback(null, ocomtes);

      });


  }

};


