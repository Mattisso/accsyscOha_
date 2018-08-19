"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var Models = require('../omodels');

module.exports = {

    getotableauposte: function (qyrparm, callback) {
       
        var getbyocompteid = Models.oTableauPoste.find(qyrparm, {}, 'tblRefCode TableauName tableauLongName fulltableauname')
            .populate('ostableaupostes')
            .exec(
            function (err, otableauposte) {
                if (err) {
                    throw (err);
                }
                callback(null, otableauposte)
            }
            )
    }
};

//{ $regex: req.params.image_id }
