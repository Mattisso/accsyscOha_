"use strict"
var path = require('path');
var Models = require(path.join(__dirname, '../omodels/index.js'));
var async = require('async');
var odahelper = require('.')
module.exports = {
    popular:  function (callback) {

        var mergeostableauposte = [];

        odahelper.Ocomptereference.popular(function (err, comptereferences) {

            if (err) throw err;

            else {
          //      var tableauName = ['tblActif', 'tblCharges', 'tblProduidts', 'tblPassif']

           //     var comptereferences = odahelper.odaSubset.findtableauNames(docs, tableauName)

                async.eachSeries(comptereferences, function (comptereference, secondcallback) {
                    var ocompte_id = comptereference.ocompte_id,
                        oreference_id = comptereference.oreference_id,
                        otableauposte_id = comptereference.otableauposte_id;
                    //     oreference_id,
                    //     ocompte_id
                    var qy = { '$and': [{'_otableauposte_id': otableauposte_id },{ '_oreference_id': oreference_id },{ '_ocompte_id': ocompte_id }] }


                    Models.nttBalance.find(qy, {},
                        function (err, elems) {

                            if (err) throw err;
                            else {
                                var obj;
                                async.eachSeries(elems, function (elem, thirdcallback) {
                               
                                    obj = {
                                        StableauName: comptereference.StableauName,
                                        ostableauposte_id: comptereference.ostableauposte_id,
                                        ostblarea_id: comptereference.ostblarea_id,
                                        AreaShortName: comptereference.AreaShortName,
                                        TableauName: comptereference.TableauName,
                                        _otableauposte_id: elem._otableauposte_id,
                                        _ocompte_id: elem._ocompte_id,
                                        IntitulCompte: elem.IntitulCompte,
                                        NumCompte: elem.NumCompte,
                                        _oexerccompta_id: elem._oexerccompta_id,
                                        _oreference_id: elem._oreference_id,
                                        SoldeCredit: elem.SoldeCredit,
                                        SoldeDebit: elem.SoldeDebit

                                    }
                                    mergeostableauposte.push(obj);


                                    thirdcallback();
                                },
                                    function (err) {

                                        if (err) throw err;
                                        else {

                                            secondcallback();
                                        }
                                    })
                            }
                        })
                },
                    function (err) {
                        if (err) throw err;
                        else {


                            callback(null, mergeostableauposte)
                        }
                    })
            }
        })
    }

}
