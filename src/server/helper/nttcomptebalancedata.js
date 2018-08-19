"use strict"
var Models = require('../omodels');
var async = require('async');

module.exports = {
    popular: function (callback) {
        async.waterfall([

            function (callback) {

                Models.nttBalance.aggregate(
                    [
                        {
                            $group: {

                                _id: { _oexerccompta_id: '$_oexerccompta_id', _oreference_id: "$_oreference_id", _otableauposte_id: '$_otableauposte_id' },
                                totalSoldeDebit: { $sum: "$SoldeDebit" },
                                totalSoldeCredit: { $sum: "$SoldeCredit" },
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    //  {allowDiskUse : true},
                    function (err, docs) {
                        if (err) throw err;

                        var obj = {}, mergeostableauposte = [];


                        async.eachSeries(docs, function (o, secondcallback) {

                            obj = {
                                _oexerccompta_id: o._id['_oexerccompta_id'],
                                _oreference_id: o._id['_oreference_id'],
                                _otableauposte_id: o._id['_otableauposte_id'],
                                SoldeDebit: o.totalSoldeDebit,
                                SoldeCredit: o.totalSoldeCredit,
                                count: o.count
                            }


                            mergeostableauposte.push(obj);

                            secondcallback();

                        }, function (err) {

                                if (err) throw err;

                                else {
                                    callback(null, mergeostableauposte)

                                }
                            }
                        );

                        //   console.log(viewModel)


                    });


            }
        ], function (err, results) {


            if (err) {

                throw err;
            } else {

                callback(null, results)

            }

        })
    }
}
