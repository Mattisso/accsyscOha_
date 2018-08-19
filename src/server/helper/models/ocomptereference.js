var cptref= require('../ocomptereference');


module.exports = {
    popular: function(callback) {
        cptref.popular(function (err, ocomptereferences){
                         if (err) throw err;
                callback(null, ocomptereferences);
            });
    }
};
