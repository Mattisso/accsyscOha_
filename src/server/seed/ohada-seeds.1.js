// getting-started.js
//var mongoose = require('mongoose');
'use strict'
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var path = require('path');
var Models = require(path.join(__dirname, '../omodels/index.js'));
var seeddata = require('./data-seed');
var oreferencedata= require('../helper/oreferencedata');
var ostbleareadata= require('../helper/ostbleareadata');
var ostableaupostedata= require('../helper/ostableaupostedata');
var otableaupostedata= require('../helper/otableaupostedata');



async.series([

  function (callback) {
    Models.User.remove({}, function (err) {
      if (err) {
        callback(err);
      }
      callback(null, 'users Removed!')
    })
  },

  function (callback) {
    Models.oCompte.remove({}, function (err) {
      if (err) {
        callback(err);
      }
      callback(null, 'ocomptes Removed!')
    })



  },
  function (callback) {
    Models.oReference.remove({}, function(err){
        if (err) {
            callback(err);
        }
        callback(null,'oreference Removed!')
    })



},

function (callback) {

  Models.oStblArea.remove({}, function(err){
      if (err) {
          callback(err);
      }
      callback(null,'ostblarea Removed!')
  })



},

function (callback) {
  Models.oTableauPoste.remove({}, function(err){
      if (err) {
          callback(err);
      }
      callback(null,'otableauposte Removed!')
  })



},


function (callback) {
  Models.oStableauPoste.remove({}, function(err){
      if (err) {
          callback(err);
      }
      callback(null,'ostableauposte Removed!')
  })



},

function (callback) {
  Models.oExercCompta.remove({}, function (err) {
    if (err) {
      callback(err);
    }
    callback(null, 'oExercCompta Removed!')
  })
},

function (callback) {

	var users = [];

		var user = new Models.User({
		username: 'admin',
		isAdmin: true,
		password: 'Password123'
			})
			// Add newly create User model to 'users' array
			users.push(user);


	async.eachSeries(

		users,

		function (user, userSavedCallBack) {

		user.save(function (err) {

			if (err)
		throw err;


			// attempt to authenticate user
      Models.User.getAuthenticated('admin', 'Password123', function (err, user, reason) {
		if (err)
			throw err;

		// login was successful if we have a user
		if (user) {
			// handle login success
			console.log('login success');
			return;
		}

		// otherwise we can determine why we failed
		var reasons = Models.User.failedLogin;
		switch (reason) {
		case reasons.NOT_FOUND:
		case reasons.PASSWORD_INCORRECT:
			// note: these cases are usually treated the same - don't tell
			// the user *why* the login failed, only that it did
			break;
		case reasons.MAX_ATTEMPTS:
			// send email or otherwise notify user that account is
			// temporarily locked
			break;
		}
	});
			userSavedCallBack();
		});

	},

		function (err) {

		if (err)
			throw (err);

		console.log(`Finished users in seeding ${users.length} records inserted`)

		callback(null, 'SUCCESS - Seed database');

	});

},

  function (callback) {

    var ocomptes = [];

        for (var i = 0; i < seeddata.ocomptedata.length; i++) {

          var ocompte = new Models.oCompte({

            CompteNumber: seeddata.ocomptedata[i].CompteNumber,
            Exception: seeddata.ocomptedata[i].Exception,
            Taux: seeddata.ocomptedata[i].Taux
          })
          // Add newly create User model to 'users' array
          ocomptes.push(ocompte);
        }

    async.eachSeries(

      ocomptes,

      function (ocompte, ocompteSavedCallBack) {

        ocompte.save(function (err) {

          if (err) {
            throw (err);
          }

          ocompteSavedCallBack();
        });

      },

      function (err) {

        if (err) throw (err);

        console.log(`Finished ocomptes in seeding ${ocomptes.length} records inserted`)




        callback(null, 'SUCCESS - Seed database');

      }
    );

  },
  function (callback) {

    oreferencedata.populate(function (err, oReferences) {
        var _oreferences = [];
        //  var _oreferencedata=[];
        // var objoreference={};

        if (err) {
            throw (err);
        }

        _.forEach(oReferences, function (oreference) {

            var objoreference = new Models.oReference(
                {
                    RefCode: oreference.RefCode,
                    Description: oreference.Description,
                    ocomptes: oreference.ocompteids

                }
            )
            _oreferences.push(objoreference);
        });


                for (var i = 0; i < _oreferences.length; i++) {
                    var obj = _oreferences[i];
                }

        async.eachSeries(

            _oreferences,

            function (obj, ocompteSavedCallBack) {


                obj.save(function (err) {

                    if (err) {
                        throw (err);
                    }

                    ocompteSavedCallBack();
                });

            },

            function (err) {

                if (err) throw (err);

                console.log(`Finished oreference in seeding ${_oreferences.length} records inserted`);




                callback(null, 'SUCCESS - Seed database');

            }
        );



    })




},
function (callback) {

  ostbleareadata.populate(function (err, ostblAreas) {
      var _ostblareas = [];
      //  var _ostblareadata=[];
      // var objostblarea={};

      if (err) {
          throw (err);
      }

      _.forEach(ostblAreas, function (ostblarea) {

          var objostblarea = new Models.oStblArea(
              {
                  AreaShortName: ostblarea.AreaShortName,
                  AreaLongName: ostblarea.AreaLongName,
                  ocomptes: ostblarea.ocompteids

              }
          )
          _ostblareas.push(objostblarea);
      });

              for (var i = 0; i < _ostblareas.length; i++) {
                  var obj = _ostblareas[i];
              }

      async.eachSeries(

          _ostblareas,

          function (obj, ocompteSavedCallBack) {


              obj.save(function (err) {

                  if (err) {
                      throw (err);
                  }

                  ocompteSavedCallBack();
              });

          },

          function (err) {

              if (err) throw (err);

              console.log(`Finished ostblareas in seeding: ${_ostblareas.length} records inserted`);


              callback(null, 'SUCCESS - Seed database');

          }
      );



  })


}
,
function (callback) {

  ostableaupostedata.populate(function (err, osTableauPostes) {
      var _ostableaupostes = [];
      //  var _ostableaupostedata=[];
      // var objostableauposte={};

      if (err) {
          throw (err);
      }

      _.forEach(osTableauPostes, function (ostableauposte) {

          var objostableauposte = new Models.oStableauPoste(
              {
                  StableauName: ostableauposte.StableauName,
                  StbleauLongName: ostableauposte.StbleauLongName,
                  ostblareas: ostableauposte.ostblareaids

              }
          )
          _ostableaupostes.push(objostableauposte);
      });


              for (var i = 0; i < _ostableaupostes.length; i++) {
                  var obj = _ostableaupostes[i];
              }


      async.eachSeries(

          _ostableaupostes,

          function (obj, ocompteSavedCallBack) {


              obj.save(function (err) {

                  if (err) {
                      throw (err);
                  }

                  ocompteSavedCallBack();
              });

          },

          function (err) {

              if (err) throw (err);

      console.log(`Finished ostableaupostes in seeding: ${_ostableaupostes.length} records inserted`);

              callback(null, 'SUCCESS - Seed database');

          }
      );



  })




}
,
function (callback) {

  otableaupostedata.populate(function (err, oTableauPostes) {
      var _otableaupostes = [];
      //  var _otableaupostedata=[];
      // var objotableauposte={};

      if (err) {
          throw (err);
      }

      _.forEach(oTableauPostes, function (otableauposte) {

          var objotableauposte = new Models.oTableauPoste(
              {

                  tblRefCode: otableauposte.tblRefCode,
                  Description: otableauposte.Description,
                  TableauName: otableauposte.TableauName,
                  tableauLongName: otableauposte.tableauLongName,
                  ostableaupostes: otableauposte.ostableauposteids

              }
          )
          _otableaupostes.push(objotableauposte);
      });

              for (var i = 0; i < _otableaupostes.length; i++) {
                  var obj = _otableaupostes[i];
              }


      async.eachSeries(

          _otableaupostes,

          function (obj, otableauposteSavedCallBack) {


              obj.save(function (err) {

                  if (err) {
                      throw (err);
                  }

                  otableauposteSavedCallBack();
              });

          },

          function (err) {

              if (err) throw (err);

              console.log(`Saving  otableauposte %s out of %s`, _otableaupostes.length, _otableaupostes.length);




              callback(null, 'SUCCESS - Seed database');

          }
      );



  })
},
function (callback) {

  var oexercomptas = [];


  for (var i = 0; i < seeddata.oexercomptadata.length; i++) {
    var oexercompta = new Models.oExercCompta({
      oExercComptaId: seeddata.oexercomptadata[i].oExercComptaId
    })

    oexercomptas.push(oexercompta);
  }

  console.log(`Populating database with %s oexercomptas`, oexercomptas.length);

  async.eachSeries(

    oexercomptas,

    function (oexercompta, oexercomptaSavedCallBack) {

      oexercompta.save(function (err) {

        if (err) {

          throw (err);
        }

        oexercomptaSavedCallBack();
      });


    },


    function (err) {

      if (err) throw (err);

      console.log(`Finished oexercomptas in seeding ${oexercomptas.length}  records inserted`)

      callback(null, 'SUCCESS - Seed database');

    }
  );

},

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
                    throw (err);
                  }

                  oexerciceSavedCallBack();

                });
              },


              function (err) {

                if (err) throw (err);

                console.log(`Finished  oExercice in seeding ${arr.length} records inserted`)

                callback(null, 'SUCCESS - Seed database');

              }
            );
          })
        })
    });
}

],

  function (err, results) {

    console.log("\n\n--- Database seed progam completed ---");

    if (err) {
      console.log("Errors = ");
      throw (err);
    } else {
      console.log("Results = ");
      console.log(results);
    }

    console.log("\n\n--- Exiting database seed progam ---");
    // Exit the process to get back to terrminal console
    process.exit(0);
  }
);
