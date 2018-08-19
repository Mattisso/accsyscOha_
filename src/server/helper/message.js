var helper = require('.'),
/*,
Ostableaupostes = require('./ostableauposte'),
Ostblareas = require('./ostblarea'),
Oreferences = require('./oreference')
Ocomptes = require('./ocompte')*/


async = require('async');

module.exports = function (viewModel, callback) {
async.parallel([
    function (next) {
        helper.odastats(next);
    }/*,
    function (next) {
     Oexerccompta.newest(next);
    }*/
    /*
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
        stats: results[0]/*,
        Oexerccompta: results[1],
        ostableauposts: results[2],
        ostblareas: results[3],
        oreferences: results[4],
        ocomptes: results[5]*/

    };
    callback(viewModel);
});
};
