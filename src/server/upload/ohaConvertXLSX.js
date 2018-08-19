
// getting-started.js
"use strict"
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var ohaConvertXLSX= (function(getFile){
        var XLSX = require('xlsx/types');
var path = require('path');

var _getworkbook  = function  (getFile) {

var workbook = XLSX.readFile(getFile)

var first_sheet_name = workbook.SheetNames[0];
var oworksheet = workbook.Sheets[first_sheet_name];

var options = {
raw : true,
header: ['NumCompte','IntitulCompte','SoldeDebit','SoldeCredit']
}
var worksheettojson= JSON.stringify(XLSX.utils.sheet_to_json(oworksheet,options));

return {
worksheettojson: worksheettojson
}

};


return {
   _getworkbook:_getworkbook
};

})();
module.exports = {
    getworkbook: ohaConvertXLSX._getworkbook
}
