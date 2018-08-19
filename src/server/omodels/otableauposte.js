var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var otableauPosteSchema = new Schema(
	{
		/*tblRefCode:
		{
			type: String,
			index: true,
			unique: true
		},
		Description:
		{
			type: String
    },*/
		TableauName:
		{
			type: String
		},
		tableauLongName:
		{
			type: String
		},
		ostableaupostes: [{
			_ostableauposte: {
				type: ObjectId,
				ref: 'oStableauPoste'
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

otableauPosteSchema.set('toObject', { getters: true });
otableauPosteSchema.set('toJSON', { getters: true });

// a setter
/*otableauPosteSchema.path('tableauLongName').set(function (v) {
	return capitalize(v);
  });*/


  otableauPosteSchema.virtual('ostableauposte').set(function(ostableauposte){
	this._ostableauposte = ostableauposte;
	}).get(function() {
	return this._ostableauposte;
	});

/*
otableauPosteSchema.virtual('fulltableauname')
	.get(function () {
		return this.tblRefCode + ' - ' + this.tableauLongName;
	}
	).set(function (v) {
		this.tblRefCode = v.substr(0,
			v.indexOf(''));
		this.tableauLongName = v.substr(v.indexOf('') + 1);
	}
  );*/
/*
otableauPosteSchema.virtual('subtableaupostes', {
	ref: 'oStableauPoste', // The model to use
	localField: 'ostableaupostes', // Find people where `localField`
	foreignField: '_id', // is equal to `foreignField`
	// If `justOne` is true, 'members' will be a single doc as opposed to
	// an array. `justOne` is false by default.
	justOne: false
});

*/

otableauPosteSchema.pre('save',
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



var oTableauPoste = mongoose.model('oTableauPoste', otableauPosteSchema);
module.exports = oTableauPoste;
