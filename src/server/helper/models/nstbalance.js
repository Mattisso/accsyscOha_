"use strict"
var Models = require('../../omodels');


module.exports = {
    popular: function (callback) {
        Models.nstBalance.find({}, {},
            function (err, nstbalances) {

                if (err) throw err;
                callback(null, nstbalances);
            }
        )
    }
};
