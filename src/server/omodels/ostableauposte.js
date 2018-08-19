var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oStableauPosteSchema = new Schema(
	{
		StableauName:
		{
			type: String,
			index: true,
			unique: true
		},
		StbleauLongName:
		{
			type: String
		
		},
		_otableauposte: 
			{
				type: ObjectId,
				ref: 'oTableauPoste'
			}
		,
		ostblareas: [{
			_ostblarea:{
				type: ObjectId,
				ref: 'oStblArea'
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

oStableauPosteSchema.virtual('ostblarea').set(function(ostblarea){
	this._ostblarea = ostblarea;
	}).get(function() {
	return this._ostblarea;
	});

/*
	oStableauPosteSchema.virtual('subostblareas', {
		ref: 'oStblArea', // The model to use
		localField: '_id', // Find people where `localField`
		foreignField: '_ostableauposte', // is equal to `foreignField`
		// If `justOne` is true, 'members' will be a single doc as opposed to
		// an array. `justOne` is false by default.
		justOne: false
	  });*/



oStableauPosteSchema.pre('save',
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



var oStableauPoste = mongoose.model('oStableauPoste', oStableauPosteSchema)
    module.exports = oStableauPoste;