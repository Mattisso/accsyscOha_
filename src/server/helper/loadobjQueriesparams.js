
var helper = require('./models'),

async = require('async');

module.exports = function (viewModel, callback) {
    async.parallel([
        function (next) {
            helper.Oexerccompta.getExeerEncour(next);
        }/*,
        function (next) {
            helper.Ocomptes.getcompteNumberBy(next);

            },
            function (next) {
                helper.Otableaupostes.GetByOtableauposte(next);

                },
                function (next) {
                    helper.Ostableaupostes.getostableauposte(next);

                    },
                    function (next) {
                        helper.Oreferences.getoreference(next);

                        },
                        function (next) {
                            helper.Ostblareas.getareashortname(next);

                            },*/
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
        viewModel.objparams = {
            hp_Oexerccompta: results[0]/*,
            hp_Ocomptes: results[1],
            hp_Otableaupostes: results[2],
            hp_Ostableaupostes: results[3],
            hp_Oreferences:results[4],
            hp_Ostblareas:results[5]*/
          /*  otableaupostes: results[1],
            ostableauposts: results[2],
            ostblareas: results[3],
            oreferences: results[4],
            ocomptes: results[5]*/

        };
        callback(viewModel);
    });
};
