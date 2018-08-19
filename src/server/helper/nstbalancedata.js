"use strict"
/* eslint-disable  no-console */
var async = require('async');

var path = require('path');
var Models = require(path.join(__dirname,'../omodels/index.js'));
var oda = require('./oda')
module.exports = {
    popular: function (callback) {
async.waterfall([
            function (callback) {
                //  var obj = {};
                var nstbalanceinputs = [];
                Models.nstBalanceInput.find({}, {}, 'NumCompte IntitulCompte SoldeDebit SoldeCredit CompteNumber',
                    function (err, stbalanceinputs) {
                        if (err) {
                             throw err;
                        }
                        else {
                            async.eachSeries(stbalanceinputs, function (nstbalanceinput, secondcallback) {
                                var qyrparm = nstbalanceinput.CompteNumber
                                Models.oCompte.find({ CompteNumber: { '$in': qyrparm } }, 'CompteNumber Taux Exception',
                                    function (err, ocomptes) {
                                        if (err) {
                                             throw err;
                                        }
                                        else {
                                            var obj;
                                            async.eachSeries(ocomptes, function (ocompte, ocomptecallback) {

                                                obj = {

                                                    ocompte_id: ocompte._id,
                                                    CompteNumber: ocompte.CompteNumber,
                                                    Taux: ocompte.Taux,
                                                    Exception: ocompte.Exception,
                                                    nstbalanceinput_id: nstbalanceinput._id,
                                                    NumCompte: nstbalanceinput.NumCompte,
                                                    IntitulCompte: nstbalanceinput.IntitulCompte,
                                                    SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                                    SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0,

                                                }

                                                nstbalanceinputs.push(obj);

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
                                        }
                                    });
                            },


                                function (err) {
                                  if (err) throw  err;

                                    callback(null, nstbalanceinputs);
                                });
                        }
                    });
            },
            function (nstbalanceinputs, callback) {

                var balanceinputs = [];
                async.eachSeries(nstbalanceinputs, function (nstbalanceinput, secondcallback) {
                    var ocompteids = nstbalanceinput.ocompte_id  //_.map(nstbalanceinput, 'ocompte_id');
                    //  console.log(ocompteids)
                    Models.oReference.find({ 'ocomptes._id': ocompteids }, '_id',
                        function (err, oreferences) {
                            if (err) {
                                 throw err;
                            }
                            else {



                                // var references = [];
                                var obj;
                                async.eachSeries(oreferences, function (oreference, ocomptecallback) {
                                    //  references.push(oreference);
                                    //   nstbalanceinput.oreference = references;
                                    //console.log(oreference);

                                    obj = {
                                        oreference_id: oreference._id,
                                        ocompte_id: nstbalanceinput.ocompte_id,
                                        CompteNumber: nstbalanceinput.CompteNumber,
                                        Taux: nstbalanceinput.Taux,
                                        Exception: nstbalanceinput.Exception,
                                        nstbalanceinput_id: nstbalanceinput.nstbalanceinput_id,
                                        NumCompte: nstbalanceinput.NumCompte,
                                        IntitulCompte: nstbalanceinput.IntitulCompte,
                                        SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                        SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0

                                    }

                                    balanceinputs.push(obj);

                                    ocomptecallback();
                                },
                                    function (err) {

                                        if (err) {
                                             throw err;
                                        }
                                        else {

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


                        callback(null, balanceinputs);
                    }
                });


            },

            function (nstbalanceinputs, callback) {
                var balanceinputs = [];

                // arg1 now equals 'three'
                async.eachSeries(nstbalanceinputs, function (nstbalanceinput, secondcallback) {
                    var oreferenceids = nstbalanceinput.oreference_id; //_.map(nstbalanceinput.oreference, '_id');
                    Models.oStblArea.find({ 'oreferences._id': oreferenceids }, '_id',
                        function (err, ostblareas) {
                            if (err) {
                                 throw err;
                            }
                            else {
                                var obj;
                                async.eachSeries(ostblareas, function (ostblarea, ocomptecallback) {
                                    //  stblareas.push(ostblarea);
                                    //  nstbalanceinput.ostblarea = stblareas;

                                    obj = {
                                        ostblarea_id: ostblarea._id,
                                        oreference_id: nstbalanceinput.oreference_id,
                                        ocompte_id: nstbalanceinput.ocompte_id,
                                        CompteNumber: nstbalanceinput.CompteNumber,
                                        Taux: nstbalanceinput.Taux,
                                        Exception: nstbalanceinput.Exception,
                                        nstbalanceinput_id: nstbalanceinput.nstbalanceinput_id,
                                        NumCompte: nstbalanceinput.NumCompte,
                                        IntitulCompte: nstbalanceinput.IntitulCompte,
                                        SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                        SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0

                                    }

                                    balanceinputs.push(obj);

                                    ocomptecallback();
                                },
                                    function (err) {

                                        if (err) {
                                             throw err;
                                        }
                                        else {

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


                        callback(null, balanceinputs);
                    }
                });
            },
            function (nstbalanceinputs, callback) {
                var balanceinputs = [];

                async.eachSeries(nstbalanceinputs, function (nstbalanceinput, secondcallback) {
                    var ostblareaids = nstbalanceinput.ostblarea_id; //_.map(nstbalanceinput.ostblarea, '_id');

                    Models.oStableauPoste.find({ 'ostblareas._id': ostblareaids }, '_id',
                        function (err, ostableaupostes) {
                            if (err) {
                                 throw err;
                            }
                            else {
                                var obj;
                                async.eachSeries(ostableaupostes, function (ostableauposte, ocomptecallback) {
                                    //  stableaupostes.push(ostableauposte);
                                    // nstbalanceinput.ostableauposte = stableaupostes;


                                    obj = {
                                        ostableauposte_id: ostableauposte._id,
                                        ostblarea_id: nstbalanceinput.ostblarea_id,
                                        oreference_id: nstbalanceinput.oreference_id,
                                        ocompte_id: nstbalanceinput.ocompte_id,
                                        CompteNumber: nstbalanceinput.CompteNumber,
                                        Taux: nstbalanceinput.Taux,
                                        Exception: nstbalanceinput.Exception,
                                        nstbalanceinput_id: nstbalanceinput.nstbalanceinput_id,
                                        NumCompte: nstbalanceinput.NumCompte,
                                        IntitulCompte: nstbalanceinput.IntitulCompte,
                                        SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                        SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0

                                    }

                                    balanceinputs.push(obj);
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
                        console.log('A file failed to process');
                    } else {
                        // callback(null, 'data loaded successfully')

                        callback(null, balanceinputs);
                    }
                });
            },
            function (nstbalanceinputs, callback) {
                var balanceinputs = [];
                // arg1 now equals 'three'
                async.eachSeries(nstbalanceinputs, function (nstbalanceinput, secondcallback) {
                    var ostableauposteids = nstbalanceinput.ostableauposte_id;//  _.map(nstbalanceinput.ostableauposte, '_id');

                    Models.oTableauPoste.find({ '$and': [{ 'ostableaupostes._id': ostableauposteids }, { tblRefCode: { '$nin': ['TI'] } }] }, '_id',
                        function (err, otableaupostes) {
                            if (err) {
                                 throw err;
                            }
                            else {

                                var obj;
                                async.eachSeries(otableaupostes, function (otableauposte, ocomptecallback) {
                                    //tableaupostes.push(otableauposte);
                                    // nstbalanceinput.otableauposte = tableaupostes;

                                    obj = {
                                        otableauposte_id: otableauposte._id,
                                        ostableauposte_id: nstbalanceinput.ostableauposte_id,
                                        ostblarea_id: nstbalanceinput.ostblarea_id,
                                        oreference_id: nstbalanceinput.oreference_id,
                                        ocompte_id: nstbalanceinput.ocompte_id,
                                        CompteNumber: nstbalanceinput.CompteNumber,
                                        Taux: nstbalanceinput.Taux,
                                        Exception: nstbalanceinput.Exception,
                                        nstbalanceinput_id: nstbalanceinput.nstbalanceinput_id,
                                        NumCompte: nstbalanceinput.NumCompte,
                                        IntitulCompte: nstbalanceinput.IntitulCompte,
                                        SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                        SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0

                                    }

                                    balanceinputs.push(obj);

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


                            }

                        });




                }, function (err) {
                    if (err) {
                        console.log('A file failed to process');
                    } else {
                        // callback(null, 'data loaded successfully')

                         callback(null, balanceinputs);
                    }
                });
            },
            function (nstbalanceinputs, callback) {
                var balanceinputs = [];
                // arg1 now equals 'three'
                async.eachSeries(nstbalanceinputs, function (nstbalanceinput, secondcallback) {
                    Models.oExercice.find({}, {},
                        function (err, oexercices) {
                            if (err) {
                                 throw err;
                            }
                            else {
                                var obj;
                                async.eachSeries(oexercices, function (oexercice, ocomptecallback) {
                                    //tableaupostes.push(otableauposte);
                                    // nstbalanceinput.otableauposte = tableaupostes;

                                    obj = {
                                        oexerccompta_id: oexercice._oexerccompta,
                                        otableauposte_id: nstbalanceinput.otableauposte_id,
                                        ostableauposte_id: nstbalanceinput.ostableauposte_id,
                                        ostblarea_id: nstbalanceinput.ostblarea_id,
                                        oreference_id: nstbalanceinput.oreference_id,
                                        ocompte_id: nstbalanceinput.ocompte_id,
                                        CompteNumber: nstbalanceinput.CompteNumber,
                                        Taux: nstbalanceinput.Taux,
                                        Exception: nstbalanceinput.Exception,
                                        nstbalanceinput_id: nstbalanceinput.nstbalanceinput_id,
                                        NumCompte: nstbalanceinput.NumCompte,
                                        IntitulCompte: nstbalanceinput.IntitulCompte,
                                        SoldeCredit: nstbalanceinput.SoldeCredit ? nstbalanceinput.SoldeCredit : 0,
                                        SoldeDebit: nstbalanceinput.SoldeDebit ? nstbalanceinput.SoldeDebit : 0

                                    }

                                    balanceinputs.push(obj);

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
                            }

                        });




                }, function (err) {
                    if (err) {
                        console.log('A file failed to process');
                    } else {


                        callback(null, balanceinputs);

                    }
                });
            },
            function (nstbalanceinputs, callback) {

                var balanceinputs = oda.removeDupbalanceinputs(nstbalanceinputs);


                callback(null, balanceinputs);
            },


            function (nstbalanceinputs, callback) {

                var balanceinputs = oda.SelectedDuplicateObject('NumCompte', nstbalanceinputs)

                callback(null, balanceinputs);
            }


        ], function (err, results) {


            if (err) {

                throw (err);
            } else {

                callback(null, results)

            }

        });
    }
}
