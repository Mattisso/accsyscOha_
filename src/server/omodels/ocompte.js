"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oCompteSchema = new Schema({
  CompteNumber:
    {
      type: String
    },
  Exception:
    {
      type: Boolean,
      default:
        false
    },
  Taux:
    {
      type: Number,
      default:
        1
    },
	/*oreferences: [
		{
			_oreference:	{
				type: ObjectId,
				ref: 'oReference',
				alias: 'oreference_id'

			}
		}

	],*/
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
    },
  isActive:
    {
      type: Boolean,
      default:
        true
    }
}, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);
oCompteSchema.set('toObject', { getters: true });
oCompteSchema.set('toJSON', { getters: true });

oCompteSchema.index(
  {
    CompteNumber: 1,
    Exception: 1
  }
);

oCompteSchema.virtual('nstbalance')
  .set(function (nstbalance) {
    this._nstbalance = nstbalance;
  })
  .get(function () {
    return this._nstbalance;
  });

oCompteSchema.virtual('oreference')
  .set(function (oreference) {
    this._oreference = oreference;
  })
  .get(function () {
    return this._oreference;
  });


oCompteSchema.virtual('ostblarea')
  .set(function (ostblarea) {
    this._ostblarea = ostblarea;
  })
  .get(function () {
    return this._ostblarea;
  });
oCompteSchema.pre('save',
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

var oCompte = mongoose.model('oCompte', oCompteSchema);

module.exports = oCompte;
