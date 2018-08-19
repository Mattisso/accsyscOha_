// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
require('../config/ohadb').connectserver()
var async = require('async');
var _ = require('lodash')
var Models = require('../omodels');
var odahelper = require('../helper');

async.series({


    removeNstbalance: function (callback) {
        Models.nstBalance.remove({}, function (err) {
            if (err) {
                callback(err);
            }
            setTimeout(function () {
                callback(null, 'data removed!')
            }, 200);

        })

    },
    insertnstBalance: function (callback) {
        odahelper.nstbalanceinput.popular(function (err, nstBalanceinputs) {
            if (err) {
                console.dir(err)
            }
            var _nstbalances = [];

            //  callback(JSON.stringify(nstBalanceinput))
            _.forEach(nstBalanceinputs, function (obj) {

                var objnstbalance = new Models.nstBalance(
                    {
                        _oexerccompta_id: obj.oexerccompta_id,
                        _oreference_id: obj.oreference_id,
                        _ocompte_id: obj.ocompte_id,
                        _otableauposte_id: obj.otableauposte_id,
                        IntitulCompte: obj.IntitulCompte,
                        NumCompte: obj.NumCompte,
                        SoldeDebit: obj.SoldeDebit* obj.Taux,
                        SoldeCredit: obj.SoldeCredit * obj.Taux

                    }
                )
                _nstbalances.push(objnstbalance);

                //    callback(JSON.stringify(nstbalanceinputdata))

            });

            Models.nstBalance.find({}).exec(function (err, nstbalances) {

                if (nstbalances.length === 0) {

                    console.log("Populating database with %s oreferences", _nstbalances.length);

                    for (var i = 0; i < _nstbalances.length; i++) {
                        var obj = _nstbalances[i];
                    }
                }

                else {
                    console.log('no data seeded');
                    process.exit(0);
                }


            });


            async.eachSeries(

                _nstbalances,

                function (obj, nstbalanceSavedCallBack) {


                    obj.save(function (err) {

                        if (err) {
                            console.dir(err);
                        }

                        nstbalanceSavedCallBack();
                    });

                },

                function (err) {

                    if (err) console.dir(err);

                    //  console.log(`Saving  oreference %s out of %s`, _nstbalances.length, _nstbalances.length);


                    setTimeout(function () {
                        callback(null, `Finished nstbalances in seeding ${_nstbalances.length} records inserted`);
                    }, 200);


                }
            );



        })
    },
    update_DS: function (callback) {

        odahelper.Ocomptereference.popular(function (err, references) {

            if (err) {
                console.dir(err)
            }
            else {
                var refcode = ['DS'], compte = ['52'];
                var insets = odahelper.odaSubset.odasub().findRefComptes(references, refcode, compte);

                async.forEach(insets, function (oo, secondcallback) {
                    var getparm = oo.ocompte_id;


                    var qy = { '$and': [{ '_ocompte_id': getparm }, { SoldeCredit: { '$gt': 0 } }] }

                    var getquery = Models.nstBalance.findOne(qy)//.where('_ocompte_id:','oo.ocompte_id')
                    getquery.exec(function (err, docs) {

                        if (err) throw err
                        else if (docs !== null) {


                            var upquery = docs.update({
                                $set: {
                                    _oreference_id: oo.oreference_id,
                                    _otableauposte_id: oo.otableauposte_id
                                }
                            })
                            upquery.exec();

                            //  console.log('update succeed');
                            secondcallback()

                        }
                        else {
                            //  console.log('no record updated');
                            secondcallback()
                        }

                    })


                }, function (err) {

                    if (err) {
                        console.dir(err)
                    }
                    else {
                        setTimeout(function () {
                            callback(null, 'DSupdate ')
                        }, 200);


                    }
                });

            }


        })

    },
    update_CH: function (callback) {

        odahelper.Ocomptereference.popular(function (err, references) {

            if (err) {
                console.dir(err)
            }
            else {
                var refcode = ['CH'], compte = ['12'];
                var objCh = _.find(references, { RefCode: 'CH' })
                var oo = _.find(references, { RefCode: 'CI' })

                var getparm = oo.ocompte_id,
                    getrefparm = oo.oreference_id


                var qy = { '$and': [{ '_ocompte_id': getparm }, { '_oreference_id': getrefparm }] }

                var getquery = Models.nstBalance.findOne(qy)

                getquery.exec(function (err, docs) {

                    if (err) throw err

                    else if (docs !== null) {
                        var upquery = docs.update({
                            $set: {
                                _oreference_id: objCh.oreference_id,
                                IntitulCompte: objCh.Description,
                                _ocompte_id: objCh.ocompte_id,
                                NumCompte: objCh.CompteNumber
                            }
                        }
                        )
                        upquery.exec();

                        setTimeout(function () {
                            callback(null, 'SUCCESS - CHupdate');
                        }, 200);

                    }
                    else {
                        setTimeout(function () {
                            callback(null, 'no record- CHupdate');
                        }, 200);


                    }


                })
            }

        })

    },
    updateChgCredit: function (callback) {

        odahelper.Ocomptereference.popular(function (err, references) {

            if (err) {
                console.dir(err)
            }
            else {

                var oo = _.find(references, { StableauName: 'tblResultChrges' })


                var getparm = oo.otableauposte_id

                var qy = { '$and': [{ '_otableauposte_id': getparm }, { SoldeCredit: { '$gt': 0 } }] }


                var getquery = Models.nstBalance.find(qy)
                getquery.exec(function (err, docs) {
                    if (err) throw err

                    else if (docs !== null) {

                        async.forEach(docs, function (obj, secondcallback) {

                            var upquery = obj.update({
                                $set: {

                                    SoldeDebit: obj.SoldeCredit * (-1),
                                    SoldeCredit: 0

                                }

                            }, { multi: true })
                            upquery.exec();

                            secondcallback();

                        }, function (err) {
                            if (err)
                                console.dir(err);
                            setTimeout(function () {
                                callback(null, 'SUCCESS - Chargesupdate');
                            }, 200);

                        })

                    }


                })

            }

        })

    },
    updatePrdtDebit: function (callback) {


        odahelper.Ocomptereference.popular(function (err, references) {

            if (err) {
                console.dir(err)
            }
            else {

                var oo = _.find(references, { StableauName: 'tblResultPrdts' })

                var getparm = oo.otableauposte_id

                var qy = { '$and': [{ '_otableauposte_id': getparm }, { SoldeDebit: { '$gt': 0 } }] }

                var getquery = Models.nstBalance.find(qy)

                getquery.exec(function (err, docs) {
                    if (err) throw err

                    else if (docs !== null) {
                        async.forEach(docs, function (o, secondcallback) {


                            var upquery = o.update({
                                $set: {
                                    SoldeCredit: o.SoldeDebit * (-1),
                                    SoldeDebit: 0


                                }

                            }, { multi: true })
                            upquery.exec();

                            secondcallback();

                        }, function (err) {
                            if (err)
                                console.dir(err);
                            setTimeout(function () {
                                callback(null, 'SUCCESS - Productupdate');
                            }, 200);

                        })

                    }


                })
            }

        })

    },
    updatePassif: function (callback) {

        odahelper.Ocomptereference.popular(function (err, references) {

            if (err) {
                console.dir(err)
            }
            else {

                var oo = _.find(references, { StableauName: 'tblBilanPassif' })


                var getparm = oo.otableauposte_id

                var qy = { '$and': [{ '_otableauposte_id': getparm }, { SoldeDebit: { '$gt': 0 } }] }


                var getquery = Models.nstBalance.find(qy)
                getquery.exec(function (err, docs) {
                    if (err) throw err

                    else if (docs !== null) {

                        async.forEach(docs, function (obj, secondcallback) {

                            var upquery = obj.update({
                                $set: {
                                    SoldeCredit: obj.SoldeDebit * (-1),
                                    SoldeDebit : 0

                                }

                            }, { multi: true })
                            upquery.exec();

                            secondcallback();

                        }, function (err) {
                            if (err)
                                console.dir(err);
                            setTimeout(function () {
                                callback(null, 'SUCCESS - Chargesupdate');
                            }, 200);

                        })

                    }


                })

            }

        })

    },
},

    function (err, results) {


        if (err) {
            console.log("Errors = ");
            console.dir(err)
        } else {
            console.log("Results = ");
            console.log(results);
        }


        process.exit(0);
    }

);
