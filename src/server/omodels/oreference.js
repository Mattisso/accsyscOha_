var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

function toLower(v) {
	return v.toLowerCase();
  }
/*
  function toUpper(v) {
	return v.toUpperCase();
  }*/

function ocapitalize (val) {
	if (typeof val !== 'string') val = '';
	return val.charAt(0).toUpperCase() + val.substring(1);
  }


var oReferenceSchema = new Schema(
	{
		RefCode:
		{
			type: String,
			index: true,
			required: true,
			unique: true
			/*
			set:toLower,
			get:toUpper*/
		},
		Description:
		{
			type: String,
			set: toLower,
			get:ocapitalize
		},
		_ostblarea:
		{
			type: ObjectId,
			ref: 'oStblArea'

		}
	,
		ocomptes: [{
			_ocompte: {
				type: ObjectId,
				ref: 'oCompte'

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

oReferenceSchema.set('toObject', { getters: true });
oReferenceSchema.set('toJSON', { getters: true });




oReferenceSchema.virtual('fullDescription')
.get(function () {
	return this.RefCode + '-' + this.Description;
}
).set(function (v) {
	this.RefCode = v.substr(0,
		v.indexOf(''));
	this.Description = v.substr(v.indexOf('') + 1);
}
	);

oReferenceSchema.index(
	{
		RefCode: 1,
		ocomptes: 1
	}
);

oReferenceSchema.virtual('ocompte')
.set(function(ocompte){
	this._ocompte = ocompte;
})
.get(function() {
	return this._ocompte;
});

oReferenceSchema.pre('save',
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

var oReference = mongoose.model('oReference', oReferenceSchema);

    module.exports = oReference;
