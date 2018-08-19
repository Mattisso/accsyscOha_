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
var oreferencedata = require('../helper/oreferencedata');
var ostbleareadata = require('../helper/ostbleareadata');
var ostableaupostedata = require('../helper/ostableaupostedata');
var otableaupostedata = require('../helper/otableaupostedata');
var ogestiondata = require('../helper/ogestiondata');


async.series({

  removeUser: function (callback) {
    Models.User.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'users Removed!')
      }, 200);
    })
  },

  removeoCompte: function (callback) {
    Models.oCompte.remove({}, function (err) {
      if (err) {
        callback(err);
      }
      setTimeout(function () {
        callback(null, 'ocomptes Removed!')
      }, 200);

    })

  },
  removeoreference: function (callback) {
    Models.oReference.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'oreference Removed!')
      }, 200);

    })

  },

  removedostblarea: function (callback) {

    Models.oStblArea.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'ostblarea Removed!')
      }, 200);

    })

  },

  removeotableauposte: function (callback) {
    Models.oTableauPoste.remove({}, function (err) {
      if (err) {
        callback(err);
      }
      setTimeout(function () {
        callback(null, 'otableauposte Removed!')
      }, 200);

    })

  },

  removeostableauposte: function (callback) {
    Models.oStableauPoste.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'ostableauposte Removed!')
      }, 200);

    })

  },

  removeoExercCompta: function (callback) {
    Models.oExercCompta.remove({}, function (err) {
      if (err) {
        callback(err);
      }

      setTimeout(function () {
        callback(null, 'oExercCompta Removed!')
      }, 200);

    })
  },

  InserUser: function (callback) {

    var users = [];

    var user = new Models.User({
      username: 'admin',
      role: 'admin',
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


        setTimeout(function () {
          callback(null, `Finished users in seeding ${users.length} records inserted`)
        }, 200);
      });

  },

  insertoCompte: function (callback) {

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

        if (err)
          throw (err);

        setTimeout(function () {
          callback(null, `Finished ocomptes in seeding ${ocomptes.length} records inserted`)
        }, 200);

      });

  },
  insertoReference: function (callback) {

    oreferencedata.populate(function (err, oReferences) {
      var _oreferences = [];
      var oreferences_ = [];
      // var objoreference={};

      if (err) {
        throw (err);
      }

      _.forEach(oReferences, function (oreference) {

        var objoreference = new Models.oReference({
          RefCode: oreference.RefCode,
          Description: oreference.Description,
          ocomptes: oreference.ocompteids

        })
        _oreferences.push(objoreference);
      });

      for (var i = 0; i < _oreferences.length; i++) {
        var obj = _oreferences[i];
      }
      //   oreferences_.push(obj);
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

          if (err)
            throw (err);

          setTimeout(function () {
            callback(null, `Finished oreference in seeding ${_oreferences.length} records inserted`)
          }, 200);

        });

    })

  },
  insertoStblArea: function (callback) {

    ostbleareadata.populate(function (err, ostblAreas) {
      var _ostblareas = [];
      var ostblareas = [];
      // var objostblarea={};

      if (err) {
        throw (err);
      }

      _.forEach(ostblAreas, function (ostblarea) {

        var objostblarea = new Models.oStblArea({
          AreaShortName: ostblarea.AreaShortName,
          AreaLongName: ostblarea.AreaLongName,
          ocomptes: ostblarea.ocompteids

        })
        _ostblareas.push(objostblarea);
      });

      for (var i = 0; i < _ostblareas.length; i++) {
        var obj = _ostblareas[i];
      }

      // ostblareas.push(obj);

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

          if (err)
            throw (err);
          setTimeout(function () {
            callback(null, `Finished ostblareas in seeding: ${_ostblareas.length} records inserted`)
          }, 200);
        });
    })
  },
  insertoStableauPoste: function (callback) {

    ostableaupostedata.populate(function (err, osTableauPostes) {
      var _ostableaupostes = [],
        ostableaupostes = [];
      //  var _ostableaupostedata=[];
      // var objostableauposte={};

      if (err) {
        throw (err);
      }

      _.forEach(osTableauPostes, function (ostableauposte) {

        var objostableauposte = new Models.oStableauPoste({
          StableauName: ostableauposte.StableauName,
          StbleauLongName: ostableauposte.StbleauLongName,
          ostblareas: ostableauposte.ostblareaids

        })
        _ostableaupostes.push(objostableauposte);
      });

      for (var i = 0; i < _ostableaupostes.length; i++) {
        var obj = _ostableaupostes[i];
      }
      //    ostableaupostes.push(obj);
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

          if (err)
            throw (err);

          setTimeout(function () {
            callback(null, `Finished ostableaupostes in seeding: ${_ostableaupostes.length} records inserted`)
          }, 200);

        });

    })

  },
  insertoTableauPoste: function (callback) {

    otableaupostedata.populate(function (err, docs) {
      var _otableaupostes = [];
      //  otableaupostes = [];
      //  var _otableaupostedata=[];
      // var objotableauposte={};

      if (err) {
        throw (err);
      }

      _.forEach(docs, function (otableauposte) {

        var objotableauposte = new Models.oTableauPoste({

         // tblRefCode: otableauposte.tblRefCode,
        //  Description: otableauposte.Description,
          TableauName: otableauposte.TableauName,
          tableauLongName: otableauposte.tableauLongName,
          ostableaupostes: otableauposte.ostableauposteids

        })
        _otableaupostes.push(objotableauposte);
      });

      for (var i = 0; i < _otableaupostes.length; i++) {
        var obj = _otableaupostes[i];
      }

      //     otableaupostes.push(obj);

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

          if (err)
            throw (err);

          setTimeout(function () {
            callback(null, `Finished ostableaupostes in seeding: ${_otableaupostes.length} records inserted`)
          }, 200);

        });

    })
  },
  insertoExercCompta: function (callback) {

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

        if (err)
          throw (err);

        setTimeout(function () {
          callback(null, `Finished oexercomptas in seeding ${oexercomptas.length}  records inserted`)
        }, 200);

      });

  },

  insertoExercice: function (callback) {

    Models.oExercCompta.find({}, {},
      function (err, oexerccomptas) {
        if (err)
          throw err;

        var qyrparm = _.max(_.map(_.map(oexerccomptas, 'oExercComptaId'), _.ary(parseInt, 1)))

        Models.oExercCompta.find({
          oExercComptaId: qyrparm
        }, {},
          function (err, oexerccompta) {
            // console.log(oexerccompta);
            if (err)
              throw err;
            Models.oExercice.find({}).exec(function (err, oexercices) {
              var arr = [];
              if (oexercices.length > 0) {
                // console.log(oexercices.length)
                Models.oExercice.remove({});
                var oexercice = new Models.oExercice({
                  oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                  ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                  _oexerccompta_id: _.map(_.map(oexerccompta, '_id'))

                })

                arr.push(oexercice);

                //     console.log(_.map(_.map(oexerccompta,'oExercComptaId')));

              } else {

                oexercice = new Models.oExercice({
                  oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                  ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                  _oexerccompta_id: _.map(_.map(oexerccompta, '_id'))
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

                  if (err)
                    throw (err);

                  setTimeout(function () {
                    callback(null, `Finished  oExercice in seeding ${arr.length} records inserted`)
                  }, 200);
                });
            })
          })
      });
  },


},

  function (err, results) {

    if (err) {
      console.log("Errors = ");
      throw (err);
    } else {
      console.log("Results = ");
      console.log(results);
    }
    process.exit(0);
  });
