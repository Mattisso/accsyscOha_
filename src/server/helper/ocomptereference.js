"use strict"
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var path = require('path');
var Models = require(path.join(__dirname, '../omodels/index.js'));
var async = require('async');
module.exports = {
    popular: function (callback) {
        async.waterfall([
            function (callback) {
                var ocomptereferences = [];
                Models.oCompte.find({}, 'CompteNumber Taux Exception',
                    function (err, ocomptes) {
                        if (err) {
                          throw err;
                        }
                        else {
                            async.eachSeries(ocomptes, function (ocompte, secondcallback) {
                                var qyparm = ocompte._id
                                Models.oReference.find({ 'ocomptes._id': qyparm }, 'RefCode Description fullDescription',
                                    function (err, oreferences) {
                                        if (err) {
                                          throw err;
                                        }
                                        else {
                                            var obj;
                                            async.eachSeries(oreferences, function (oreference, thirdcallback) {

                                                obj = {
                                                    ocompte_id: ocompte._id,
                                                    CompteNumber: ocompte.CompteNumber,
                                                    Taux: ocompte.Taux,
                                                    Exception: ocompte.Exception,
                                                    oreference_id: oreference._id,
                                                    RefCode: oreference.RefCode,
                                                    Description: oreference.Description,
                                                    fullDescription: oreference.fullDescription

                                                }


                                                ocomptereferences.push(obj);
                                                thirdcallback();

                                            }, function (err) {
                                                // console.log(ocompte)
                                                if (err) {
                                                  throw err;
                                                }
                                                else {

                                                    secondcallback();
                                                }
                                            })



                                        }
                                    });
                            },
                                function (err) {

                                  if (err) {
                                  throw err;
                                }
                                else {

                                  callback(null, ocomptereferences);
                                }

                                });

                        }


                    })
            },
            function (ocomptereferences, callback) {

                var comptereferences = [];

                async.eachSeries(ocomptereferences, function (ocomptereference, secondcallback) {
                    var ocompteids = ocomptereference.ocompte_id; //_.map(comptereference.ostblarea, '_id');

                    Models.oStblArea.find({ 'ocomptes._id': ocompteids }, 'AreaShortName AreaLongName',
                        function (err, ostblareas) {
                            if (err) {
                              throw err;
                            }
                            else {
                                var obj;
                                async.eachSeries(ostblareas, function (ostblarea, ocomptecallback) {
                                    //  stableaupostes.push(ostblarea);
                                    // comptereference.ostblarea = stableaupostes;


                                    obj = {
                                        ostblarea_id: ostblarea._id,
                                        AreaShortName: ostblarea.AreaShortName,
                                        AreaLongName: ostblarea.AreaLongName,
                                        oreference_id: ocomptereference.oreference_id,
                                        RefCode: ocomptereference.RefCode,
                                        Description: ocomptereference.Description,
                                        fullDescription: ocomptereference.fullDescription,
                                        ocompte_id: ocomptereference.ocompte_id,
                                        CompteNumber: ocomptereference.CompteNumber,
                                        Taux: ocomptereference.Taux,
                                        Exception: ocomptereference.Exception
                                    }
                                    // other= _.merge(ocomptereference,obj)

                                    comptereferences.push(obj);

                                    ocomptecallback();
                                },
                                    function (err) {
                                        // console.log(ocompte)
                                        if (err) {
                                          throw err;
                                        }
                                        else {

                                            secondcallback();
                                        }
                                    });

                                //    secondcallback()
                            }

                        });




                }, function (err) {
                    if (err) {
                       throw err
                    } else {
                        // callback(null, 'data loaded successfully')
                        callback(null, comptereferences);
                    }
                });
            },

            function (ocomptereferences, callback) {
                var comptereferences = [];

                async.eachSeries(ocomptereferences, function (ocomptereference, secondcallback) {
                    var ostblareaids = ocomptereference.ostblarea_id; //_.map(ocomptereference.ostblarea, '_id');

                    Models.oStableauPoste.find({
                        'ostblareas._id': ostblareaids
                    }, 'StableauName  StbleauLongName',
                        function (err, ostableaupostes) {
                            if (err) {
                              throw err;
                            } else {
                                var obj;

                                async.eachSeries(ostableaupostes, function (ostableauposte, ocomptecallback) {
                                    //  stableaupostes.push(ostableauposte);
                                    // ocomptereference.ostableauposte = stableaupostes;


                                    obj = {
                                        ostableauposte_id: ostableauposte._id,
                                        StableauName: ostableauposte.StableauName,
                                        StbleauLongName: ostableauposte.StbleauLongName,
                                        ostblarea_id: ocomptereference.ostblarea_id,
                                        AreaShortName: ocomptereference.AreaShortName,
                                        AreaLongName: ocomptereference.AreaLongName,
                                        oreference_id: ocomptereference.oreference_id,
                                        RefCode: ocomptereference.RefCode,
                                        Description: ocomptereference.Description,
                                        fullDescription: ocomptereference.fullDescription,
                                        ocompte_id: ocomptereference.ocompte_id,
                                        CompteNumber: ocomptereference.CompteNumber,
                                        Taux: ocomptereference.Taux,
                                        Exception: ocomptereference.Exception

                                    }
                                    // other= _.merge(ocomptereference,obj)

                                    comptereferences.push(obj);

                                    ocomptecallback();
                                },
                                    function (err) {
                                        // console.log(ocompte)
                                        if (err) {
                                          throw err;
                                        } else {

                                            secondcallback();
                                        }
                                    });

                                //    secondcallback()
                            }

                        });

                }, function (err) {
                    if (err) {
                        console.log('A file failed to process');
                    } else {
                        // callback(null, 'data loaded successfully')
                        callback(null, comptereferences);
                    }
                });
            },
            function (ocomptereferences, callback) {
                var comptereferences = [];
                // arg1 now equals 'three'
                async.eachSeries(ocomptereferences, function (ocomptereference, secondcallback) {
                    var ostableauposteids = ocomptereference.ostableauposte_id; //  _.map(ocomptereference.ostableauposte, '_id');

                    Models.oTableauPoste.find({
                        '$and': [{
                            'ostableaupostes._id': ostableauposteids
                        }, {
                            tblRefCode: {
                                '$nin': ['TI']
                            }
                        }
                        ]
                    }, 'tblRefCode Description TableauName tableauLongName',
                        function (err, otableaupostes) {
                            if (err) {
                              throw err;
                            } else {

                                var obj;
                                async.eachSeries(otableaupostes, function (otableauposte, ocomptecallback) {
                                    //tableaupostes.push(otableauposte);
                                    // ocomptereference.otableauposte = tableaupostes;

                                    obj = {
                                        otableauposte_id: otableauposte._id,
                                        tblRefCode: otableauposte.tblRefCode,
                                        otableauDescription: otableauposte.Description,
                                        TableauName: otableauposte.TableauName,
                                        tableauLongName: otableauposte.tableauLongName,
                                        fulltableauname: otableauposte.fulltableauname,
                                        ostableauposte_id: ocomptereference.ostableauposte_id,
                                        StableauName: ocomptereference.StableauName,
                                        StbleauLongName: ocomptereference.StbleauLongName,
                                        ostblarea_id: ocomptereference.ostblarea_id,
                                        AreaShortName: ocomptereference.AreaShortName,
                                        AreaLongName: ocomptereference.AreaLongName,
                                        oreference_id: ocomptereference.oreference_id,
                                        RefCode: ocomptereference.RefCode,
                                        Description: ocomptereference.Description,
                                        fullDescription: ocomptereference.fullDescription,
                                        ocompte_id: ocomptereference.ocompte_id,
                                        CompteNumber: ocomptereference.CompteNumber,
                                        Taux: ocomptereference.Taux,
                                        Exception: ocomptereference.Exception

                                    }
                                    //   other= _.merge(ocomptereference,obj)

                                    comptereferences.push(obj);

                                    ocomptecallback();
                                },
                                    function (err) {
                                        // console.log(ocompte)
                                        if (err) {
                                          throw err;
                                        } else {

                                            secondcallback();
                                        }
                                    });

                            }

                        });

                }, function (err) {
                    if (err) {
                        console.log('A file failed to process');
                    } else {
                        // callback(null, 'data loaded successfully')
                        callback(null, comptereferences);
                    }
                });
            }


        ], function (err, results) {


            if (err) {

              throw err;
            } else {

                callback(null, results)

            }

        });
    }
}
