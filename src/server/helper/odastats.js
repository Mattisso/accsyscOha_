
var models = require('../omodels'),
async = require('async');

module.exports = function(callback) {

async.parallel([
    function(next) {
        models.nstBalanceInput.count({}, next);
    },
    function(next) {
        models.nstBalance.count({}, next);
    },


    function(next) {

        models.nstBalanceInput.aggregate({ $group : {
            _id : null,
            totalSoldeDebit : { $sum : '$SoldeDebit' }
        }}, function(err, result) {
            var nstotalSoldeDebit = 0;
            if (result.length > 0) {
                nstotalSoldeDebit += result[0].totalSoldeDebit;

            }
            next(null, nstotalSoldeDebit);
        });
    },
    function(next) {
        models.nstBalanceInput.aggregate({ $group : {
            _id : null,

            totalSoldeCredit:{ $sum : '$SoldeCredit'}

        }}, function(err, result) {

            var nstotalSoldeCredit=0;

            if (result.length > 0) {

                nstotalSoldeCredit += result[0].totalSoldeCredit;


            }
            next(null, nstotalSoldeCredit);
        });
    } ,

    function(next) {

        models.nstBalance.aggregate({ $group : {
            _id : null,
            totalSoldeDebit : { $sum : '$SoldeDebit' }
        }}, function(err, result) {
            var totalSoldeDebit = 0;
            if (result.length > 0) {
                totalSoldeDebit += result[0].totalSoldeDebit;

            }
            next(null, totalSoldeDebit);
        });
    },
    function(next) {
        models.nstBalance.aggregate({ $group : {
            _id : null,

            totalSoldeCredit:{ $sum : '$SoldeCredit'}

        }}, function(err, result) {

            var totalSoldeCredit=0;

            if (result.length > 0) {

                totalSoldeCredit += result[0].totalSoldeCredit;


            }
            next(null, totalSoldeCredit);
        });
    }

], function(err, results){
    callback(null, {
        balanceinput_Count: results[0],
        balance_COunt: results[1],
        balanceinput_totalSoldeDebit: results[2],
        balanceinput_totalSoldeCredit: results[3],
        balance_totalSoldeDebit: results[4],
        balance_totalSoldeCredit: results[5]
       /* oStableauPoste : results[3],
        oStableauPoste : results[3],

       oreferencesCount: results[4],
        ocomptesCount: results[5]*/
        //,
      //  views: results[2],
      //  likes: results[3]
    });
   // console.log(results);
});
};
