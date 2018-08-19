"use strict"

/* eslint-disable  no-console */

var Models = require('../../omodels');

module.exports = {
  getareashortname: function (selectedareashortname=null, callback) {

    if (selectedareashortname !== undefined && selectedareashortname !== null) {
      Models.oStblArea.findOne({'RefCode': selectedareashortname}, {})
      .select('AreaShortName   AreaLongName ')
      .exec( function (err, ostblareas) {
        if (err) throw err;
        callback(null, ostblareas);
      });
       }
    else {
      console.log( 'no argument was passed')
    }
  },

    popular: function (callback) {
        Models.oStblArea.find({}, {},
            function (err, ostblareas) {

                if (err) throw err;
                callback(null, ostblareas);
            }
        )
    }
};
