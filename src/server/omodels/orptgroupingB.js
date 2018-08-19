var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oRptGroupingBSchema = new Schema(
	{
		RefCodeB:
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
		orptgroupingAs:
		{
			type: ObjectId,
			ref: 'oRptGroupingA'
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


var oRptGroupingB = mongoose.model('oRptGroupingB', oRptGroupingBSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
	module.exports = oRptGroupingB;