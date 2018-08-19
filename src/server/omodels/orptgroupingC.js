var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;


var oRptGroupingCSchema = new Schema(
	{
		RefCodeC:
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
		orptgroupingBs:
		{
			type: ObjectId,
			ref: 'oRptGroupingB'
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


var oRptGroupingC = mongoose.model('oRptGroupingC', oRptGroupingCSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
	module.exports = oRptGroupingC;