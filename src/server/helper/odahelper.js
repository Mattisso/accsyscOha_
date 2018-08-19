"use strict"
/*eslint-disable no-unused-vars */
var shared= require('./shared');
module.exports = {
    replaceString:
    function (str) {
        var arr = [];

        for (var i = 2; i <= 4; i++) {
            //  var mm= shared.Left(str,i);
            arr.push(shared.Left(str, i));
            // shared.Left(str,i);

        }
        //  return
        //  arr.push(mm);

        return arr;

    },

    getComptenumber:


     function (obj) {
        var result = [];
        for (let i = 0; i < obj.length; i++) {
            var _obj = {
                hpcomptenumber:
                obj[i]
            };
            if (_obj !== null && _obj !== undefined) {
                result.push(_obj);
            }



        }
        return result;
    },
    filter: function (array, test){
        var passed=[];
        for (var i=0; i<array.length; i++){
            if(test(array[i]))
          passed.push(array[i]);
        }
        return passed;
    },
    oarray: function (array){
        var passed=[];
        for (var i=0; i<array.length; i++){
            if(array[i])
          passed.push(array[i]);
        }
        return passed;
    },

    map: function (array, transform) {
      var mapped = [];
      for (var i = 0; i < array.length; i++)
      mapped.push(transform(array[i]));
      return mapped;
      },
      secondfilter:  function (array, snarray) {
        var passed = [];
                   for (var i = 0; i <array.length; i++) {
                       var ocomptes = array[i].snarray;
                       for (var j = 0; j < ocomptes.length; j++) {
                           var ocompte = ocomptes[j];
                           if(ocompte)
                          passed.push(ocompte);

                       }
                       return passed;
                   }

       },


       Predicatefilter:   function (arr, predicate) {
        let idx = -1,
        len = arr.length,
        result = [];
        while (++idx < len) {
        let value = arr[idx];
        if (predicate(value, idx, this)) {
        result.push(value);
        }
        }
        return result;
        },




};
