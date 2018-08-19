"use strict"

module.exports = {
    Left:
function (str, n){
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return String(str);
    else
        return String(str).substring(0,n);
},

Right:
function (str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
},


};
