"use strict"

var odaSubset = (function () {

    var hasReferenceCompte = function (set, set2, o) {
        return set.indexOf(o.RefCode) > -1 && set2.indexOf(o.CompteNumber) > -1;
    }

    var hasReference = function (set, o) {
        return set.indexOf(o.RefCode) > -1;
    }

    var hasStableauOstblAreas = function (set,set2, o) {
        return set.indexOf(o.StableauName) > -1  && set2.indexOf(o.AreaShortName) > -1;
    }


    var hasStableauName = function (set, o) {
        return set.indexOf(o.StableauName) > -1 ;
    }

    var hasNumCompte = function (set, o) {
      return set.indexOf(o.NumCompte) > -1 ;
  }

//NumCompte
    var hastableauName = function (set, o) {
        return set.indexOf(o.TableauName) > -1;
    }

    var hasOstblAreaName= function (set, o) {
        return set.indexOf(o.AreaShortName) > -1;
    }



    var hasnttcomptebalanceId= function (set, o) {
      return set.indexOf(o._nttcomptebalance_id);
  }

    var hasCompteNumber = function (set, o) {
        return set.indexOf(o.CompteNumber) > -1;
    }

    var findReferencesBy = function (array, refcode) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasReference(refcode, o);

        })

        return _arr;
    }


    var findStableauOstblAreaNameBy = function (array, stableauname, ostblareaname) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasStableauOstblAreas(stableauname,ostblareaname, o);

        })

        return _arr;
    }

    var findOstblAreaNameBy = function (array, ostblareaname) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasOstblAreaName(ostblareaname, o);

        })

        return _arr;
    }


    var findnttcomptebalanceIdBy = function (array, _nttcomptebalanceid) {
      var _arr;
      _arr = array.filter(function (o) {
          return hasnttcomptebalanceId(_nttcomptebalanceid, o);

      })

      return _arr;
  }
    var findStableauNameBy = function (array, stableauname) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasStableauName(stableauname, o);

        })

        return _arr;
    }
    var findtableauNameBy = function (array, tableauname) {
        var _arr;
        _arr = array.filter(function (o) {
            return hastableauName(tableauname, o);

        })

        return _arr;
    }


    var findNumCompteBy = function (array, numcompte) {
      var _arr;
      _arr = array.filter(function (o) {
          return hasNumCompte(numcompte, o);

      })

      return _arr;
  }

    var findRefComptesBy = function (array, refcode, compte) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasReferenceCompte(refcode, compte, o);

        })

        return _arr;

    }
    var findCompteNumbersBy = function (array, compte) {
        var _arr;
        _arr = array.filter(function (o) {
            return hasCompteNumber(compte, o);

        })

        return _arr;

    }
    var reducegroupby = function (arr) {

        var hash = Object.create(null),
        grouped = [];

        arr.forEach(function (o) {
            var key = ['_oexerccompta_id', '_oreference_id', '_otableauposte_id'].map(function (k) {
                return o[k];
            }).join('|');

            if (!hash[key]) {
                hash[key] = {
                    _oexerccompta_id: o._oexerccompta_id,
                    _oreference_id: o._oreference_id,
                    _otableauposte_id: o._otableauposte_id,
                    SoldeDebit: 0,
                    SoldeCredit: 0
                };
                grouped.push(hash[key]);
            }
            ['SoldeDebit', 'SoldeCredit'].forEach(function (k) {
                hash[key][k] += o[k];
            });
        });

        /*
            var result = Object.values(arr.reduce(function(r, e) {

                var key = e._oexerccompta_id + '|' + e._oreference_id + '|' + e._otableauposte_id;;
                if (!r[key]) r[key] = e;
                else {
                  r[key].SoldeDebit += e.SoldeDebit;
                  r[key].SoldeCredit += e.SoldeCredit
                }
                return r;
              }, {}))
          */
        /*

      var helper = {};
      var result  = arr.reduce(function (r, o) {


          var key = o._oexerccompta_id + '-' + o._oreference_id + '-' + o._otableauposte_id ;

          if (!helper[key]) {
              helper[key] = Object.assign({}, o); // create a copy of o
              r.push(helper[key]);
          } else {
              helper[key].SoldeDebit += o.SoldeDebit;
              helper[key].SoldeCredit += o.SoldeCredit;
          }

          return r;
      }, []);*/

        return grouped;

    }



    var odagroupBy = function (arr, Phase, step = '') {

        var pahseArr = [];
        var resultArr = [];


        arr.map(function (item) {
            var pushed = false;
            pahseArr.map(function (ele) {
                if (ele === item._otableauposte_id) {
                    pushed = true;
                }
            })
            if (!pushed) {
                pahseArr.push(item._otableauposte_id);
            }
        })


        pahseArr.map(function (item) {
            var totalSoldeDebit = 0,
                totalSoldeCredit = 0; //+= SoldeCredit;
            arr.map((ele) => {

                if (ele._otableauposte_id === item) {
                    totalSoldeDebit += parseFloat(ele.SoldeDebit)
                    totalSoldeCredit += parseFloat(ele.SoldeCredit)
                }
            })

            resultArr.push({
                _otableauposte_id: item,
                SoldeDebit: totalSoldeDebit,
                SoldeCredit: totalSoldeCredit
            })
        })

        if (step != '') {
        //    var resultArr = [];


            pahseArr.map(function (item) {
                var stepArr = [];

                arr.map(function (item2) {
                    var pushed = false;
                    stepArr.map(function (ele) {
                        if (ele === item2._oreference_id) {
                            pushed = true;
                        }
                    })
                    if (!pushed) {
                        stepArr.push(item2._oreference_id);
                    }
                })

                stepArr.map(function (item1) {
                    var totalSoldeDebit = 0,
                        totalSoldeCredit = 0;
                    arr.map((ele) => {
                        if (ele._oreference_id === item1 && ele._otableauposte_id === item) {
                            totalSoldeDebit += parseFloat(ele.SoldeDebit),
                                totalSoldeCredit += parseFloat(ele.SoldeCredit)
                        }
                    })
                    resultArr.push({
                        _oexerccompta_id: item,
                        _otableauposte_id: item,
                        _oreference_id: item1,
                        SoldeDebit: totalSoldeDebit,
                        SoldeCredit: totalSoldeCredit
                    })
                })

            })
            return resultArr;
        }
        return resultArr;

    }

    var objFindRefCodeBy = function (array) {

        var byName;
        //  var _array= newfilter(array);
        // var myobject =
        array.forEach(function (item) {
            // return byName[item.RefCode] = item;
            byName = item.ocompte_id;

        })
        return byName;
    }

    var objFindnttcomptebalanceIdBy = function (array) {

      var byName;
      //  var _array= newfilter(array);
      // var myobject =
      array.forEach(function (item) {
          // return byName[item.RefCode] = item;
          byName = item._nttcomptebalance_id;

      })
      return byName;
  }


    function odasub() {
      return {
        findRefComptes: findRefComptesBy,
        objFindRefCode: objFindRefCodeBy,
        findReferences: findReferencesBy,
        findCompteNumbers: findCompteNumbersBy,
        findStableauName: findStableauNameBy,
        odagroupBy: odagroupBy,
        reducegroupby: reducegroupby,
        findtableauNames:findtableauNameBy,
        findNumCompteBy:findNumCompteBy,
        findOstblAreaNames:findOstblAreaNameBy,
        findStableauOstblAreaNames:findStableauOstblAreaNameBy,
        findnttcomptebalanceId:findnttcomptebalanceIdBy,
        objFindnttcomptebalanceId:objFindnttcomptebalanceIdBy,
        hasCompteNumber:hasCompteNumber
    }

    }
return {
  odasub: odasub
}


})();
module.exports = {

  odasub: odaSubset.odasub

  /*
    findRefComptes: odaSubset.findRefComptesBy,
    objfindRefCode: odaSubset.objFindRefCodeBy,
    findReferences: odaSubset.findReferencesBy,
    findCompteNumbers: odaSubset.findCompteNumbersBy,
    findStableauNames: odaSubset.findStableauNameBy,
    odagroupBy: odaSubset.odagroupBy,
    reducegroupby: odaSubset.reducegroupby,
    findtableauNames:odaSubset.findtableauNameBy,
    findOstblAreaNames:odaSubset.findOstblAreaNameBy,
    findStableauOstblAreaNames:odaSubset.findStableauOstblAreaNameBy*/

}
