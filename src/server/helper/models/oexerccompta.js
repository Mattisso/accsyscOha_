var Models = require('../../omodels');


var getExerccomptaBy = function (encour) {
  if (encour !== undefined && encour !== null) {
    return { oExercComptaId: encour }

  }
  else {
    return new Error(`no Compte Number Matching  ${encour}`)
  }
};

  var caller =function (f, v) {
    // Call the given function
   f(v);
};
var indirectCaller =function (f, v) {
  // Call `caller`, who will in turn call `f`
  caller(f,v);
}


module.exports = {
    popular: function(callback) {
        Models.oExercCompta.find({}, {})
        .sort({'CreatedOn': -1})
        .limit(5)
        .select('oExercComptaId')
            .exec(function(err, oExercComptas) {
                if (err) throw err;
                callback(null, oExercComptas);
            });
    },
    getExeerEncour: function (callback,v) {

    var selectedYear=indirectCaller(getExerccomptaBy,v)

     // console.log(selectedYear)


        Models.oExercCompta.findOne(selectedYear,{})
        .select('oExercComptaId')
        .exec(function(err, oExercComptas) {
          if (err) throw err;
           callback(null, oExercComptas);

      });



    },
    getExerccomptaid:  function (model, callback) {

      Models.oExercCompta.findOne({ _id: model._oexerccompta_id}, {})
        .select('oExercComptaId')
        .exec(function (err, oExercCompta) {
          if (err) throw err;
          callback(null, oExercCompta);
        });
    }


};
