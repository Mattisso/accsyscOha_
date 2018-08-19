"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var Models = require('../omodels');


module.exports = {

    getostableauposte: function (qyrparm, callback) {
     /*   if (qyrparm == undefined) {
            qyrparm = {};
        }
        else if (qyrparm !== undefined && qyrparm !== null) {
            qyrparm = qyrparm;
        }
        else {
            qyrparm = qyrparm;
        }*/
        // { 'ostblareas._id': ostblareaids }
        var getbyocompteid = Models.oStableauPoste.find(qyrparm, {})
            .populate('ostblareas')
            .exec(
            function (err, ostableauposte) {
                if (err) {
                    throw (err);
                }
                callback(null, ostableauposte)

            }

            )

    }
};
