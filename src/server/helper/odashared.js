"use strict"


var odashared= ( function(){
   var  oarray= function (array){
        var passed=[];
        for (var i=0; i<array.length; i++){
            if(array[i])
          passed.push(array[i]);
        }
        return passed;
    }

    var  groupingsAfilter= function (array){
        var passed = [];
        for (var i = 0; i <array.length; i++) {
            var ocomptes = array[i].groupingsA;
            for (var j = 0; j < ocomptes.length; j++) {
                var ocompte = ocomptes[j];
                if(ocompte)
               passed.push(ocompte);

            }

        }
        return passed;
    }




       var  groupingsBfilter = function (array) {
        var passed = [];
                   for (var i = 0; i <array.length; i++) {
                       var ocomptes = array[i].groupingsA;
                       for ( var j = 0; j < ocomptes.length; j++) {
                           var ocompteA = ocomptes[j].groupingsB;
                           for (var k = 0; k < ocompteA.length; k++) {
                            var ocompteB = ocompteA[k];
                           if(ocompteB)
                          passed.push(ocompteB);
                           }

                       }

                   }
                   return passed;
       }


     var  secondfilter = function (array) {
        var passed = [];
                   for (var i = 0; i <array.length; i++) {
                       var ocomptes = array[i].groupingsA;
                       for (var j = 0; j < ocomptes.length; j++) {
                           var ocompte = ocomptes[j];
                           if(ocompte)
                          passed.push(ocompte);

                       }

                   }
                   return passed;
       }


       var  groupingsCfilter = function (array) {
        var passed = [];
        for (var i=0; i< array.length; i++){
            var items =array[i].groupingsA;
            for (var n=0; n<items.length; n++){
                var itemsA= items[n].groupingsB;
                for (var m=0; m<itemsA.length; m++){
                    var itemsB= itemsA[m].groupingsC;
                    for (var k=0; k<itemsB.length; k++){
                        var itemsC= itemsB[k];
                passed.push(itemsC)

            }
        }
    }

       }
       return passed;
    }



var inArray = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle)
            return true;
    }
    return false;
}


return {

    oarray:oarray,

    inArray:inArray,
    secondfilter:secondfilter,
    groupingsAfilter:groupingsAfilter,
    groupingsBfilter:groupingsBfilter,
    groupingsCfilter:groupingsCfilter


}


})();
module.exports = {
    oarray:odashared.oarray,
    inArray:odashared.inArray,
    secondfilter:odashared.secondfilter,
    groupingsAfilter:odashared.groupingsAfilter,
    groupingsBfilter:odashared.groupingsBfilter,
    groupingsCfilter:odashared.groupingsCfilter



};

