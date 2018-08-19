
// var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
// var oda = require(path.join(__dirname, '../helper/oda.js'));


var nttcomptebalanceDetailSchema = new Schema(
  {
    _nttcomptebalance_id:
    {
      type: ObjectId,
      ref: 'nttCompteBalance',
    },
    NumCompte:
    {
      type: String,
      index: true
    },
    IntitulCompte: String,
    /*  SoldeDebit: {
        type: Number ,
        set: soldebitnullvalue,
        get: soldebitnullvalue
      },
      SoldeCredit: {
        type: Number ,
       set: soldecreditnullvalue,
       get: soldecreditnullvalue
      },
  */
    SoldeDebit: Number,
    SoldeCredit: Number,
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
  }, { toJSON: { virtuals: true } }
)

nttcomptebalanceDetailSchema.virtual('nttcomptebalance')
  .set(function (nttcomptebalance) {
    this._nttcomptebalance = nttcomptebalance;
  })
  .get(function () {
    return this._nttcomptebalance;
  });

nttcomptebalanceDetailSchema.index(
  {
    _nttcomptebalance_id: 1,
    NumCompte: 1,
    IntitulCompte: 1

  }
);


nttcomptebalanceDetailSchema.set('toObject', { getters: true });
nttcomptebalanceDetailSchema.set('toJSON', { getters: true });

/*
function soldebitnullvalue() {
  return oda.replaceNullToZero(this.SoldeDebit);
}

function soldecreditnullvalue() {
  return oda.replaceNullToZero(this.SoldeCredit);
}

*/

nttcomptebalanceDetailSchema.pre('save',
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


var nttCompteBalanceDetail = mongoose.model('nttCompteBalanceDetail', nttcomptebalanceDetailSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
module.exports = nttCompteBalanceDetail;
