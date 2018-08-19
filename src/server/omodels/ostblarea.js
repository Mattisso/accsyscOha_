var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;


var oStblAreaSchema = new Schema(
	{
		AreaShortName:
		{
			type: String,
			index: true,
			required: true,
			unique: true
		},
		AreaLongName:
		{
			type: String
		},
		_ostableauposte:
		{
			type: ObjectId,
			ref: 'oStableauPoste',
			alias: 'ostableauposte_id'
		}
	,
	ocomptes: [{
		_ocompte: {
			type: ObjectId,
			ref: 'oCompte',
			alias: 'ocompte_id'
		}
	}

	],
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
	}, { toJSON: { virtuals: true } }
);
oStblAreaSchema.set('toObject', { getters: true });
oStblAreaSchema.set('toJSON', { getters: true });

oStblAreaSchema.virtual('suboreferences', {
	ref: 'oReference', // The model to use
	localField: 'oreferences', // Find people where `localField`
	foreignField: '_id', // is equal to `foreignField`
	// If `justOne` is true, 'members' will be a single doc as opposed to
	// an array. `justOne` is false by default.
	justOne: false
  });

  oStblAreaSchema.virtual('ostableauposte')
  .set(function(ostableauposte){
	this._ostableauposte = ostableauposte;
	}).get(function() {
	return this._ostableauposte;
	});

  oStblAreaSchema.virtual('ocompte')
  .set(function(ocompte){
    this._ocompte= ocompte;
  })
  .get(function() {
    return this._ocompte;
  });



oStblAreaSchema.pre('save',
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

var oStblArea = mongoose.model('oStblArea', oStblAreaSchema);
    module.exports = oStblArea;
