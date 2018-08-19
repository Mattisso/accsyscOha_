
var helper = require('.'),
 oda = require('..'),

async = require('async');

module.exports = function (viewModel, callback) {
    async.parallel([
        function (next) {
            oda.Stats(next);
        },
        function (next) {
            helper.Otableaupostes.popular(next);

            },
            function (next) {
                helper.Ocomptes.popular(next);

                },
                function (next) {
                    helper.Oreferences.popular(next);

                    },
                    function (next) {
                        helper.Ostableaupostes.popular(next);

                        },
                        function (next) {
                            helper.Ostblareas.popular(next);

                            },
                            function (next) {
                              helper.Oexerccompta.popular(next);

                              }

    ], function (err, results) {
        viewModel.sidebar = {
            stats: results[0],
            otableaupostes:results[1],
            ocomptes: results[2],
            oreferences: results[3],
            ostableaupostes: results[4],
            ostblareas:results[5],
           oexerccompta: results[6]
        };
        callback(viewModel);
    });
};
