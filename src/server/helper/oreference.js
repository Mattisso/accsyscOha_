"use strict"

/* eslint-disable  no-console */

var Models = require('../omodels');

module.exports = {
  Getreference: function (qyrparm, callback) {
    if (qyrparm !== undefined && qyrparm !== null) {

      Models.oReference.find(qyrparm, {},
        function (err, oreference) {
          if (err) {
            throw (err);
          }
          callback(null, oreference)

        }

      )
    }
    else {
      Models.oReference.find({}, {},
        function (err, oreference) {
          if (err) {
            throw (err);
          }
          callback(null, oreference)

        }

      )
    }
    //qyrparm={ 'ocomptes._id': compteids }


  },

  GetreferenceNoCallabck: function (qyrparm) {

    var getquery;

    if (qyrparm !== undefined && qyrparm !== null) {

      getquery = Models.oReference.aggregate(
        [

          { $unwind: { path: "$ocomptes", preserveNullAndEmptyArrays: true } },
          { $match: qyrparm }

        ]).allowDiskUse(true)
    }
    else {

      getquery = Models.oReference.aggregate(
        [

          { $unwind: { path: "$ocomptes", preserveNullAndEmptyArrays: true } },
          { $match: {} }

        ]).allowDiskUse(true)
    }

    //   query.select('_id, RefCode');
    return getquery;

    //qyrparm={ 'ocomptes._id': compteids }
    //  query=  Models.oReference.find(qyrparm, {});
    //  query.select('_id, RefCode');



  }




};
