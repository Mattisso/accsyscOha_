
var helper = require('./models'),

async = require('async');

module.exports = function (viewModel, callback) {
    async.parallel([
        function (next) {
            helper.Stats(next);
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
                /*,
        function (next) {
         Otableaupostes.popular(next);
        },
        function (next) {
          Ostableaupostes.newest(next);

        },
        function (next) {
            Ostblareas.newest(next);

          },
          function (next) {
            Oreferences.newest(next);

            },
            function (next) {
                Ocomptes.newest(next);

            }*/
    ], function (err, results) {
        viewModel.sidebar = {
            stats: results[0],
            otableaupostes:results[4],
            ocomptes: results[1],
            oreferences: results[2],
            ostableaupostes: results[3],
            ostblareas:results[5],
           oexerccompta: results[6],
          /* ostableauposts: results[2],
            ostblareas: results[3],
            oreferences: results[4],
            ocomptes: results[5]*/

        };
        callback(viewModel);
    });
};
