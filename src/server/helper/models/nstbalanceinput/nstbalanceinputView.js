//var nttCompteBalanceViewEnhanced =
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var spacer= require('../../../SharedKernel')
// Get Programming with JavaScript
// Inported by listings 15.02 and 15.03
// fitnessApp.userView

var nstbalanceinputview = (function () {
  "use strict";

 var getInfo = function (objdata) {
   var newLine = spacer.newLine();
       var underline = newLine + spacer.line(28, "-") + newLine;

       var infoString = newLine + underline;

     objdata.nstBalanceInputdata.forEach(function (nstBalanceInput) {
           infoString += nstBalanceInput.NumCompte + "  ";
           infoString += nstBalanceInput.IntitulCompte + "  ";
           infoString += nstBalanceInput.SoldeDebit + "  ";
           infoString += nstBalanceInput.SoldeCredit + "\n";
       });

       infoString += "\n" + objdata.DetailCount + " items has been created";
       infoString += "\n" + objdata.TotalSoldeDebit + " of Total Debit";
       infoString += "\n" + objdata.TotalSoldeCredit + " of Total Credit";
       infoString += underline;

       infoString += spacer.box("Well done!", 14, "*");

       return infoString;
 };

 var render = function (nstBalanceInput) {
   console.log(getInfo(nstBalanceInput.getData()));

     //enable for production
//  var nstBalanceInputDiv = document.getElementById("nstbalanceinput");
   //    nstBalanceInputDiv.innerHTML = getInfo(nstbalanceinput.getData());
 };


return {
   render: render
 };

})();

 module.exports = {
  nstbalanceinputview:nstbalanceinputview
 };
