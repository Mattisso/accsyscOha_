/*eslint-disable no-unused-vars */
"use strict"

var Models = require('../omodels')


module.exports = {
    getnstbalance: function (qyrparm, callback) {
       /* if (qyrparm !== undefined && qyrparm !== null) {
            qyrparm = qyrparm;
        }
        else if (qyrparm === undefined || qyrparm === null) {
            qyrparm = {};
        }
        else {
            qyrparm = {};
        }*/
        //qyrparm={ CompteNumber: { '$in': comptenumber }

        Models.nstBalance.find(qyrparm, {},
            function (err, nstbalances) {
                if (err) {
                    throw   err;
                }
                if (nstbalances !== null) {
                    callback(null, nstbalances)

                }
            })


    },

    getUpdate: function (qyrparm, updatevalue, callback) {

        var conditions = qyrparm
            , update = {  $set: { updatevalue } }
            , options = { multi: true };

        Models.nstBalance.update(conditions, update, options, callback);
/*
        function (err, numAffected) {
            // numAffected is the number of updated documents
        }*/

    },
    getUpdateNocallback: function (qyrparm, updatevalue) {

                var conditions = qyrparm
                    , update = {  $set: { updatevalue } }
                    , options = { multi: true };

                Models.nstBalance.findByIdAndUpdate({ }, { $set: { text: 'changed' }}).exec();



            }




}
