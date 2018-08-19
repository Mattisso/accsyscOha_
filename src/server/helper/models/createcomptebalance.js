
var helper = require('.'),

async = require('async');

module.exports = function (callback) {
    async.parallel({

     Oexerccompta: function (next) {
          helper.Oexerccompta.popular(next);

          },
    Otableaupostes:  function (next) {
            helper.Otableaupostes.popular(next);

            },
    Oreferences:     function (next) {
              helper.Oreferences.popular(next);

            }/*,
            function (next) {
                helper.Ocomptes.popular(next);

                },
                    function (next) {
                        helper.Ostableaupostes.popular(next);

                        },
                        function (next) {
                            helper.Ostblareas.popular(next);

                            }*/

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
          }, function (err, results) {
            if (err) {

            throw (err)
          } else {

              callback(null, results)

          }
    });
};
