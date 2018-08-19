"use strict"
var _ = require('lodash')

var oda = ( function(){

    var  LeftSubstr = function (comptenumber, number) {
        if (number <= 0)
            return "";
        else if (number > String(comptenumber).length)
            return String(comptenumber);
        else
            return String(comptenumber).substring(0, number);
    }


  var   replaceString= function (comptenumber) {
        var arr = [];
        for (var i = 2; i <= 4; i++) {
            arr.push(LeftSubstr(comptenumber, i));
        }
        return arr;

    }

   var  oarray= function (array){
        var passed=[];
        for (var i=0; i<array.length; i++){
            if(array[i])
          passed.push(array[i]);
        }
        return passed;
    }


var removeDupbalanceinputs = function(array) {
 var arr=   array.filter(function (a) {
        var key = a.NumCompte + '|' + a.SoldeDebit + '|' + a.Exception + '|' + a.SoldeCredit;
        if (!this[key]) {
            this[key] = true;
            return true;
        }
    }, Object.create(null))

    return arr;
}

var checkDuplicateInObject = function (propertyName, array) {
    var seenDuplicate = false,
        testObject = {};

        array.map(function(item) {
      var itemPropertyName = item[propertyName];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      }
      else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    return seenDuplicate;
  }

 var  AssignedDuplicateToObject = function (prop,array) {
     var _array=removeDupbalanceinputs(array);

    var _unArray = [];

    _array.forEach(function (item) {
        var arfinddup = checkDuplicateInObject(prop, _array)
        var isPresent = _unArray.filter(function (elem) {
            return arfinddup == true && elem.NumCompte === item.NumCompte
             && elem.SoldeDebit === item.SoldeDebit
             && elem.SoldeCredit === item.SoldeCredit
            && elem.Exception === item.Exception


        })

        if (isPresent.length == 0) {

            {
                _unArray.push(item)


            }

        }
    })
    return _unArray;
}



var SelectedDuplicateObject = function (prop,array) {
    var arr = [];
    var _array= AssignedDuplicateToObject(prop,array)
    _.forEach(_array, function (item) {
        if (item.duplicate === true && item.Exception === true) {
            _.reject(_array, 'Exception');
            arr.push(item)

        }

    });

    return _.difference(_array, arr);
}


var inArray = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle)
            return true;
    }
    return false;
}

var replaceNullToZero = function (val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}


return {
    SelectedDuplicateObject: SelectedDuplicateObject,
    oarray:oarray,
    replaceString:replaceString,
    removeDupbalanceinputs:removeDupbalanceinputs,
    inArray:inArray,
    replaceNullToZero:replaceNullToZero

}


})();
module.exports = {
    SelectedDuplicateObject: oda.SelectedDuplicateObject,
    oarray:oda.oarray,
    replaceString:oda.replaceString,
    removeDupbalanceinputs:oda.removeDupbalanceinputs,
        inArray:oda.inArray,
        replaceNullToZero:oda.replaceNullToZero



};

