"use strict"

module.exports = {
    Left:
    function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return String(str);
        else
            return String(str).substring(0, n);
    },


    replaceString:
    function (str, Left) {
        var arr = [];

        for (var i = 2; i <= 4; i++) {

            arr.push(Left (str, i));
        }

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
    }

   /*
    return {
        left:Left,
        replaceString:replaceString,
        getComptenumber:getComptenumber
    }*/


    };
