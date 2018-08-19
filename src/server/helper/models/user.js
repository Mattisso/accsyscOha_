"use strict"
var Models = require('../../omodels');


module.exports = {
    popular: function (callback) {
        Models.User.find({}, {},
            function (err, users) {

                if (err) throw err;
                callback(null, users);
            }
        )
    }
};
