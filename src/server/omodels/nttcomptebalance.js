
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var oda = require(path.join(__dirname, '../helper/oda.js'));

//var nttCompteBalanceDetail = require('./nttcomptebalancedetail');

/*
function getTotalSoldedebit() {
  let totalSoldedebit = 0;
  for (const item of this.nttcomptebalancedetails) {
      if (item.SoldeDebit !== undefined) {
          totalSoldedebit += item.SoldeDebit;
          break;
      }
  }

  return totalSoldedebit;
}

function getTotalSoldecredit() {
  let totalSoldecredit = 0;

  for (const item of this.nttcomptebalancedetails) {
      if (item.SoldeCredit !== undefined) {
          totalSoldecredit += item.SoldeCredit;
          break;
      }
      return totalSoldecredit;
  }
}*/

var nttCompteBalanceSchema = new Schema({
    _oexerccompta_id:
    {
        type: ObjectId,
        ref: 'oExercCompta',
    },
    _otableauposte_id:
    {
        type: ObjectId,
        ref: 'oTableauPoste',
    },
    _oreference_id:
    {
        type: ObjectId,
        ref: 'oReference'
    },
 /*   totalSoldeDebit: {
      type: Number},

    totalSoldeCredit: {
      type: Number},
   nttcomptebalancedetails: [], {
_nttcomptebalancedetail:{
     type: ObjectId,
         ref: 'nttCompteBalanceDetail'}}]*/
    CreatedOn:
    {
        type: Date,
        default:
        Date.now
    },
    CreatedBy:
    {
        type: String
    },
    ModifiedOn:
    {
        type: Date,
        default:
        Date.now
    },
    ModifiedBy:
    {
        type: String
    }
}
)

nttCompteBalanceSchema.set('toObject', { getters: true });
nttCompteBalanceSchema.set('toJSON', { getters: true });


nttCompteBalanceSchema.index(
	{
	_oexerccompta_id: 1,
	_otableauposte_id:1,
	_oreference_id: 1

	}
);
var DetailCount = 0,
TotalSoldeDebit = 0,
TotalSoldeCredit = 0;

let  nttcomptebalancedetails=[]

nttCompteBalanceSchema.method('addBalanceDetail', function (obj) {

 // let  nttcomptebalancedetails=[]

nttcomptebalancedetails.push(
  {
    "_nttcomptebalance_id": this._id,
  "NumCompte":  obj.NumCompte,
  "IntitulCompte": obj.IntitulCompte,
  "SoldeDebit": obj.SoldeDebit,
  "SoldeCredit": obj.SoldeCredit
 });
  TotalSoldeDebit +=   oda.replaceNullToZero(obj.SoldeDebit) ;
  TotalSoldeCredit += oda.replaceNullToZero(obj.SoldeCredit) ;
  DetailCount = nttcomptebalancedetails.length

  return {
      TotalSoldeDebit: TotalSoldeDebit,
      TotalSoldeCredit: TotalSoldeCredit,
      DetailCount: DetailCount

  }


  // return this.model('Animal').find({ type: this.type }, cb);
});


nttCompteBalanceSchema.method('hasitem', function (obj) {
  return this.nttcomptebalancedetails.indexOf(obj) !== -1;

});

nttCompteBalanceSchema.method('removeItem', function (obj) {
  var itemIndex = nttcomptebalancedetails.indexOf(obj);
  if (itemIndex !== -1) {
      nttcomptebalancedetails.splice(itemIndex, 1);
  }
});


nttCompteBalanceSchema.method('addcomptebalancedetail', function () {
  nttcomptebalancedetails.push({
    "_nttcomptebalance_id" : this._id,
    "NumCompte":  "",
    "IntitulCompte": "",
    "SoldeDebit": "",
    "SoldeCredit":""
  });
  // this.nttcomptebalancedetails.slice();
});


nttCompteBalanceSchema.static('getTotalSoldedebit',function () {
 // let totalSoldedebit = 0;
  for (const item of nttcomptebalancedetails) {
      if (item.SoldeDebit !== undefined) {
        TotalSoldeDebit += item.SoldeDebit;
          break;
      }
  }

  return TotalSoldeDebit;
})

nttCompteBalanceSchema.static('getTotalSoldecredit',function () {


  for (const item of nttcomptebalancedetails) {
      if (item.SoldeCredit !== undefined) {
        TotalSoldeCredit += item.SoldeCredit;
          break;
      }
      return TotalSoldeCredit;
  }
})


nttCompteBalanceSchema.virtual('comptebalancedetails')
  .set(function (comptebalancedetails) {
      this._comptebalancedetails = comptebalancedetails;
  })
  .get(function () {
      return this._comptebalancedetails;
  });

  nttCompteBalanceSchema.method('getData', function () {
    return {
      'id': this.id,
      '_oexerccompta_id': this._oexerccompta_id,
      '_otableauposte_id': this._otableauposte_id,
      '_oreference_id': this._oreference_id,
      'totalSoldeDebit': TotalSoldeDebit,
      'totalSoldeCredit': TotalSoldeCredit,
      'DetailCount': DetailCount,
      'nttcomptebalancedetails': nttcomptebalancedetails.slice()
    };
  });


  nttCompteBalanceSchema.virtual('nttcomptebalancedetails', {
    ref: 'nttCompteBalanceDetail', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_nttcomptebalance_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
  });


nttCompteBalanceSchema.virtual('comptebalancedetail')
  .set(function (comptebalancedetail) {
    this._comptebalancedetail = comptebalancedetail;
  })
  .get(function () {
    return this._comptebalancedetail;
  });

nttCompteBalanceSchema.pre('save',
    function (next) {
        // get the current date
        var currentDate = new Date();

        if (!this.CreatedOn)
            this.CreatedOn = currentDate;
        if (!this.ModifiedOn)
            this.ModifiedOn = currentDate;
        if (!this.CreatedBy)
            this.CreatedBy = 'Admin';
        if (!this.ModifiedBy)
            this.ModifiedBy = 'Admin';
        next();
    }
);


var nttCompteBalance = mongoose.model('nttCompteBalance', nttCompteBalanceSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
    module.exports = nttCompteBalance;
