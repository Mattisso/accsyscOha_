var XLSX = require('xlsx/types');

  var _getworkbook = (function (getFile) {

    var buf= Buffer.from(getFile);
       var workbook = XLSX.readFile(buf)

       var first_sheet_name = workbook.SheetNames[0];
       var oworksheet = workbook.Sheets[first_sheet_name];

       var options = {
           raw: true,
           header: ['NumCompte', 'IntitulCompte', 'SoldeDebit', 'SoldeCredit']
       }
     //  var worksheettojson = JSON.stringify(XLSX.utils.sheet_to_json(oworksheet, options));
       var worksheettojson = function() {
          return  XLSX.utils.sheet_to_json(oworksheet, options);
        }

       return {
           worksheettojson: worksheettojson
       }
})();
module.exports = {
   worksheettojson: _getworkbook.worksheettojson
}
