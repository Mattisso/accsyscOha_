"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var oda = require(path.join(__dirname, '../helper/oda.js'));

var NumCompteValidator = [
  function (val) {
    var testVal = val.trim();
    return (testVal.length > 0)
  },
  // Custom error text...
  `{PATH}  cannot be empty`];


var nstBalanceInputSchema = new Schema(
  {
    NumCompte:
    {
      type: String,
      required: true,
      index: true
    },
    IntitulCompte:
    {
      type: String,
      required: true
    },
    SoldeDebit: {
      type: Number

    },
    SoldeCredit: {
      type: Number
    },
    CompteNumber:
    {
      type: String,
      set: leftstrcomptenumber,
      get: leftstrcomptenumber
    },
    CreatedOn:
    {
      type: Date,
      default:
        Date.now
    },
    CreatedBy:
    {
      type: String
      // default:'Admin'
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
      //default: 'Admin'
    }
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

nstBalanceInputSchema.set('toObject', { getters: true });
nstBalanceInputSchema.set('toJSON', { getters: true });

function leftstrcomptenumber(NumCompte) {
  return oda.replaceString(this.NumCompte);
}
/*
function soldebitnullvalue(SoldeDebit) {
  return oda.replaceNullToZero(this.SoldeDebit);
}

function soldecreditnullvalue(SoldeCredit) {
  return oda.replaceNullToZero(this.SoldeCredit);
}
*/


nstBalanceInputSchema.pre('save',
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

var nstBalanceInput = mongoose.model('nstBalanceInput', nstBalanceInputSchema);

//if (typeofmodule != "undefined" && module.exports)
module.exports = nstBalanceInput;
