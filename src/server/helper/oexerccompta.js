var Models = require('../omodels');


module.exports = {
    popular: function(callback) {
        Models.oExercCompta.find({}, {},
            function(err, oExercComptas) {
                if (err) throw err;
                callback(null, oExercComptas);
            });
    }
};
