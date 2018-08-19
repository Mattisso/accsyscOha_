 // import { nstBalanceInput } from '../../../server/omodels/nstbalanceinput';

// import ohaconvert = require('../../shared/ohaconvert');

export interface INstbalanceinput  {
  id: string;
  NumCompte: string;
  IntitulCompte: string;
  SoldeDebit?: number;
  SoldeCredit?: number;
  addbalanceinput?: () => void;
  hasitem?: (objdata: any) => boolean;
  removeItem?: (objdata: any) => void;
  getData?: () => void;
  CreatedOn?: Date;
  CreatedBy?: string;
  ModifiedOn?: Date;
  ModifiedBy?: string;
}

export class Nstbalanceinput implements INstbalanceinput {
  addbalanceinput: () => void;
  hasitem: (objdata: any) => boolean;
  removeItem: (objdata: any) => void;
  getData: () => void;
  private _arrnstBalanceInputs: INstbalanceinput[] = [];


  id: string; NumCompte: string; IntitulCompte: string; SoldeDebit?: number; SoldeCredit?: number;
  CreatedOn?: Date;  ModifiedOn?: Date;


  constructor(id: string, numcompte: string, intitulCompte: string, soldeDebit?: number, soldeCredit?: number) {
    this.id = id;
    this.NumCompte = numcompte;
    this.SoldeDebit = soldeDebit;
    this.SoldeCredit = soldeCredit;

    function isNum(value) {
      if (isNaN(value)) {
        value = 0;
      } else {
        return value;

      }

    }

 this.addbalanceinput = function () {
  this._arrnstBalanceInputs.push({
    'id': this.id,
    'NumCompte': this.numcompte,
    'IntitulCompte': this.intitulCompte,
    'SoldeDebit': this.soldeDebit,
    'SoldeCredit': this.oldeCredit,
    'CreatedOn': this.CreatedOn,
    'CreatedBy': this.CreatedBy,
    'ModifiedOn': this.ModifiedOn,
    'ModifiedBy': this.ModifiedBy

  });


  // var i;
  /* for (let i = 0; i < _arrnstBalanceInputs.length; i++) {
     TotalSoldeDebit += isNum(_arrnstBalanceInputs[i].this.soldeDebit);

       }

       for ( let i = 0; i < _arrnstBalanceInputs.length; i++) {
     TotalSoldeCredit += isNum(_arrnstBalanceInputs[i].SoldeCredit);


       }*/

       let  DetailCount = 0;
       let TotalSoldeDebit = 0;
       let TotalSoldeCredit = 0;

   TotalSoldeDebit += isNum(this.soldeDebit);
  TotalSoldeCredit += isNum(this.soldeCredit);
  DetailCount = this._arrnstBalanceInputs.length;

  return {
    TotalSoldeDebit: TotalSoldeDebit,
    TotalSoldeCredit: TotalSoldeCredit,
    DetailCount: DetailCount,
  };

 };
this.hasitem = function (objdata) {
  return this._arrnstBalanceInputs.indexOf(objdata) !== -1;

};
this.removeItem = function (objdata) {
  const itemIndex = this._arrnstBalanceInputs.indexOf(objdata);
  if (itemIndex !== -1) {
    this._arrnstBalanceInputs.splice(itemIndex, 1);
  }
};

// var getData;
this.getData = function () {
  return {
    'NumCompte': this.numcompte,
    'IntitulCompte': this.intitulCompte,
    'SoldeDebit': this.soldeDebit,
    'SoldeCredit': this.oldeCredit,
    'TotalSoldeDebit': this.TotalSoldeDebit,
    'TotalSoldeCredit': this.TotalSoldeCredit,
    'CreatedOn': this.CreatedOn,
    'CreatedBy': this.CreatedBy,
    'ModifiedOn': this.ModifiedOn,
    'ModifiedBy': this.ModifiedBy,
    'DetailCount': this.DetailCount,
    '_arrnstBalanceInputs': this._arrnstBalanceInputs.slice()
  };
};
  }

  }
