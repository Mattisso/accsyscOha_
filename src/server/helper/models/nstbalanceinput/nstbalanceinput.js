//  async = require('async')
var Models = require('../../../omodels');

var nstbalanceinput= (function () {


  var DetailCount = 0,
  TotalSoldeDebit = 0,
  TotalSoldeCredit = 0,
  _arrbalanceinputs =[];

function toBalanceinput (requestBody) {

  return new Models.nstBalanceInput(
    {
      NumCompte: requestBody.NumCompte,
      IntitulCompte: requestBody.IntitulCompte,
      SoldeDebit: requestBody.SoldeDebit,
      SoldeCredit: requestBody.SoldeCredit

    });
}


function toUpdateBalanceinput (result, requestparamid, requestBody) {
  var d = new Date();

if (result) {
  {
    result._id = requestparamid,
    result.NumCompte = requestBody.NumCompte,
    result.IntitulCompte= requestBody.IntitulCompte,
    result.SoldeDebit= requestBody.SoldeDebit,
    result.SoldeCredit = requestBody.SoldeCredit,
    result.ModifiedOn = d;

  }
}
return result;
}



function BuildnttBalanceinput(requestBody) {

  var balanceinputdata = toBalanceinput(requestBody);

    _arrbalanceinputs.push(balanceinputdata)

    if (balanceinputdata.SoldeCredit !== undefined  && balanceinputdata.SoldeCredit !== null ) {
      TotalSoldeCredit += balanceinputdata.SoldeCredit;

    }

    if (balanceinputdata.SoldeDebit !== undefined  && balanceinputdata.SoldeDebit !== null ) {
      TotalSoldeDebit += balanceinputdata.SoldeDebit;

    }

DetailCount = _arrbalanceinputs.length

return {
  TotalSoldeDebit: TotalSoldeDebit,
	TotalSoldeCredit: TotalSoldeCredit,
  DetailCount: DetailCount,
  _arrbalanceinputs:_arrbalanceinputs.slice()

}

  }

  function  toInitializeInstance(body)  {
    var balanceinputdata = BuildnttBalanceinput(body)
    
    return {
      'totalSoldeDebit': balanceinputdata.TotalSoldeDebit,
      'totalSoldeCredit': balanceinputdata.TotalSoldeCredit,
      'DetailCount': balanceinputdata.DetailCount,
      '_arrbalanceinputs':   balanceinputdata._arrbalanceinputs.slice()
    };


  }



function hasitem (obj) {
return this._arrbalanceinputs.indexOf(obj) !== -1;

}

function removeItem (obj) {
var itemIndex = _arrbalanceinputs.indexOf(obj);
if (itemIndex !== -1) {
  _arrbalanceinputs.splice(itemIndex, 1);
}
}


function  addNewbalanceinput() {
_arrbalanceinputs.push({
  "NumCompte": "",
  "IntitulCompte": "",
  "SoldeDebit": "",
  "SoldeCredit": ""
});
// this._arrbalanceinputs.slice();
}


function getTotalSoldedebit() {
// let totalSoldedebit = 0;
for (const item of _arrbalanceinputs) {
  if (item.SoldeDebit !== undefined  && item.SoldeDebit !== null )  {
    TotalSoldeDebit += item.SoldeDebit;
    break;
  }
}

return TotalSoldeDebit;
}

function getTotalSoldecredit () {


for (const item of _arrbalanceinputs) {
  if (item.SoldeCredit !== undefined  && item.SoldeCredit !== null ) {
    TotalSoldeCredit += item.SoldeCredit;
    break;
  }
  return TotalSoldeCredit;
}
}

function getTotalCount () {

    if (_arrbalanceinputs.length !== undefined && _arrbalanceinputs.length>0) {

      return _arrbalanceinputs.length;

    }

  }



function getData () {

return {
  'totalSoldeDebit': getTotalSoldedebit(),
  'totalSoldeCredit': getTotalSoldecredit(),
  'DetailCount': getTotalCount(),
  '_arrbalanceinputs':   _arrbalanceinputs.slice()
};
}



function toinit() {

  return {
    toInitializeInstance:toInitializeInstance,
    toBalanceinput:toBalanceinput,
    BuildnttBalanceinput:BuildnttBalanceinput,
    getData:getData,
    hasitem:hasitem,
    removeItem:removeItem,
    addNewbalanceinput:addNewbalanceinput,
    toUpdateBalanceinput:toUpdateBalanceinput
  };

}


return {
  toinit: toinit
}




})();
module.exports= {
toinit:nstbalanceinput.toinit
}
