"use strict"

var Models = require('../../omodels');

module.exports = {
    popular: function (callback) {
        Models.nttBalance.find({}, {},
            function (err, nttbalances) {

                if (err) throw err;
                callback(null, nttbalances);
            }
        )
    }
};
