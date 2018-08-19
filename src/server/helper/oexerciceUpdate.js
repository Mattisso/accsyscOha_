
"use strict"

/* eslint-disable  no-console */
var _ = require('lodash')
var Models = require('../omodels');
var async = require('async');

module.exports = {
  ExcerciceUpdate:
    function (callback) {

      Models.oExercCompta.find({}, {},
        function (err, oexerccomptas) {
          if (err) throw err;

          var qyrparm = _.max(_.map(_.map(oexerccomptas, 'oExercComptaId'), _.ary(parseInt, 1)))

          Models.oExercCompta.find({ oExercComptaId: qyrparm }, {},
            function (err, oexerccompta) {
              // console.log(oexerccompta);
              if (err) throw err;
              Models.oExercice.find({}).exec(function (err, oexercices) {
                var arr = [];
                if (oexercices.length > 0) {
                  // console.log(oexercices.length)
                  Models.oExercice.remove({});
                  var oexercice = new Models.oExercice({
                    oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                    ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                    oexerccompta_id: _.map(_.map(oexerccompta, '_id'))

                  })

                  arr.push(oexercice);

                  //     console.log(_.map(_.map(oexerccompta,'oExercComptaId')));

                }
                else {

                  oexercice = new Models.oExercice({
                    oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                    ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                    oexerccompta_id: _.map(_.map(oexerccompta, '_id'))
                  })
                  arr.push(oexercice);
                }

                //  console.log(arr)

                async.eachSeries(

                  arr,


                  function (oexercice, oexerciceSavedCallBack) {
                    oexercice.save(function (err) {

                      if (err) {
                        // Send JSON response to console for errors
                        throw err;
                      }

                      oexerciceSavedCallBack();

                    });
                  },


                  function (err) {

                    if (err) throw err;

                    console.log("Finished aysnc.each in seeding db")

                    callback(null, 'SUCCESS - Seed database');

                  }
                );
              })
            })
        });
    }
}
