"use strict"

var Models = require('../omodels');


module.exports = {

        getcomptenumber : function (comptenumber) {
      if (comptenumber !== undefined && comptenumber !== null) {
      var getquery = Models.oCompte.findOne(comptenumber)
 //  getquery.select('_id')
return getquery;
     }
     else {
    return  new Error(`no Compte Number Matching  ${comptenumber}`)
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


