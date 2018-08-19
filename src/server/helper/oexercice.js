var Models = require('../omodels');

module.exports = {
       popular: function(callback) {
        Models.oExercice.findOne({}, {},
            function(err, oexercice) {
                if (err) throw err;
                callback(null, oexercice);
            });
    }
};
