var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oRptGroupingASchema = new Schema(
	{
		RefCodeA:
		{
			type: String,
			index: true,
			required: true,
			unique: true
		},
		Description:
		{
			type: String
		},
		tableaupostes:
		{
			type: ObjectId,
			ref: 'oTableauPoste'
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
	}
)

var oRptGroupingA = mongoose.model('oRptGroupingA', oRptGroupingASchema);
//if (typeofmodule != "undefined" && module.exports)
	module.exports = oRptGroupingA;
