//var nttCompteBalanceViewEnhanced =
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var spacer= require('../../../SharedKernel')

var nttCompteBalanceViewEnhanced = (function () {
  "use strict";

  var getInfo = function (nttCompteBalanceData) {
    var newLine = spacer.newLine();
    var underline = newLine + spacer.line(28, "-") + newLine;

    var infoString = newLine + nttCompteBalanceData.oExercComptaId + " ";
    infoString += nttCompteBalanceData.oTablunderlineeauPosteId + "  ";
    infoString += nttCompteBalanceData.oReferenceId + " ";
    nttCompteBalanceData.nttCompteBalanceDetails.forEach(function (nttCompteBalanceDetail) {
      infoString += nttCompteBalanceDetail.NumCompte + "  ";
      infoString += nttCompteBalanceDetail.IntitulCompte + "  ";
      infoString += nttCompteBalanceDetail.SoldeDebit + "  ";
      infoString += nttCompteBalanceDetail.SoldeCredit + "\n";
    });

    infoString += "\n" + nttCompteBalanceData.DetailCount + " items has been created";
    infoString += "\n" + nttCompteBalanceData.TotalSoldeDebit + " of Total Debit";
    infoString += "\n" + nttCompteBalanceData.TotalSoldeCredit + " of Total Credit";
    infoString += underline;

    infoString += spacer.box("Well done!", 14, "*");

    return infoString;
  };

  var render = function (nttCompteBalance) {
     console.log(getInfo(nttCompteBalance.getData()));

    //enable for production
   /* var nttcomptbalanceDiv = document.getElementById("nttcomptbalance");
    nttcomptbalanceDiv.innerHTML = getInfo(nttcomptbalance.getData());*/
  };

  return {
    render: render
  }
})();

module.exports = {
nttCompteBalanceViewEnhanced :nttCompteBalanceViewEnhanced
}

//(function () {

//    var getNameInfo = function (playerData) {
//        return playerData.oReferenceId;
//    };

//    var getHealthInfo = function (playerData) {
//        return "(" + playerData.oExercComptaId + ")";
//    };

//    var getItemsInfo = function (playerData) {
//        var itemsString = "Items:" + spacer.newLine();

//        playerData.items.forEach(function (item, i) {
//            itemsString += "   - " + item + spacer.newLine();
//        });

//        return itemsString;
//    };

//    var getTitleInfo = function (playerData) {
//        return getNameInfo(playerData) + " " + getHealthInfo(playerData);
//    };

//    var getInfo = function (playerData) {
//        var info = spacer.box(getTitleInfo(playerData), 40, "*");
//        info += "  " + getItemsInfo(playerData);
//        info += spacer.line(40, "*");
//        info += spacer.newLine();

//        return info;
//    };

//    var render = function (player) {
//        console.log(getInfo(player.getData()));
//    };

//    if (window.theCrypt === undefined) {
//        window.theCrypt = {};
//    }

//    theCrypt.playerView = {
//        render: render
//    };

//})();
