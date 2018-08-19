var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var nttBalanceSchema = new Schema(
	{
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
			type: String,
			index: true
		},
		IntitulCompte: String,
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
	}, {
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}


)


nttBalanceSchema.set('toObject', { getters: true });
nttBalanceSchema.set('toJSON', { getters: true });


nttBalanceSchema.index(
	{
		_oexerccompta_id: 1,
	_otableauposte_id:1,
	_oreference_id: 1,
	NumCompte:1

	}
);


nttBalanceSchema.pre('save',
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


var nttBalance = mongoose.model('nttBalance', nttBalanceSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
	module.exports = nttBalance;
