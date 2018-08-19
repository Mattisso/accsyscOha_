"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var oda = require(path.join(__dirname, '../helper/oda.js'));


var nstBalanceSchema = new Schema({
  _oexerccompta_id:
    {
      type: ObjectId,
      ref: 'oExercCompta'
    },
  _otableauposte_id:
    {
      type: ObjectId,
      ref: 'oTableauPoste'

    },
  _oreference_id:
    {
      type: ObjectId,
      ref: 'oReference'
    },

  _ocompte_id:
    {
      type: ObjectId,
      ref: 'oCompte'
    },
  NumCompte:
    {
      type: String
      , index: true
    },
  IntitulCompte: String,
  SoldeDebit: { type: Number},//, set: getsoldebit, get: getsoldebit },
  SoldeCredit: { type: Number},//, set: getsoldecredit,get: getsoldecredit },
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
}, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

nstBalanceSchema.set('toObject', { getters: true });
nstBalanceSchema.set('toJSON', { getters: true });
/*
function getsoldebit(SoldeDebit) {
  return oda.replaceNullToZero(this.SoldeDebit);
}

function getsoldecredit(SoldeCredit) {
  return oda.replaceNullToZero(this.SoldeCredit);
}
*/
nstBalanceSchema.index(
  {
    _oexerccompta_id: 1,
    _otableauposte_id: 1,
    _oreference_id: 1,
    NumCompte: 1

  }
);

nstBalanceSchema.virtual('otableauposte')
  .set(function (otableauposte) {
    this._otableauposte = otableauposte;
  }).get(function () {
    return this._otableauposte;
  });

nstBalanceSchema.virtual('oreference')
  .set(function (oreference) {
    this._oreference = oreference;
  })
  .get(function () {
    return this._oreference;
  });

nstBalanceSchema.virtual('ocompte')
  .set(function (ocompte) {
    this._ocompte = ocompte;
  })
  .get(function () {
    return this._ocompte;
  });


nstBalanceSchema.virtual('oexercice')
  .set(function (oexercice) {
    this._oexercice = oexercice;
  })
  .get(function () {
    return this._oexercice;
  });




nstBalanceSchema.pre('save',
  function (next) {

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


var nstBalance = mongoose.model('nstBalance', nstBalanceSchema);
module.exports = nstBalance;
