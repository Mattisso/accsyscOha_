var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var _oreferencesC = {
    type: ObjectId,
    ref: 'oReference'
},

 _oreferencesB = {
    type: ObjectId,
    ref: 'oReference',
    groupingsC: [_oreferencesC]
},
 _oreferencesA = {
    type: ObjectId,
    ref: 'oReference',
    groupingsB: [_oreferencesB]

};


var oRptGroupingSchema = new Schema(
    {
        _otableauPosteRefCode_id: {
            type: ObjectId,
            ref: 'oReference'
        },
        groupingsA: [_oreferencesA],

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


oRptGroupingSchema.virtual('groupingsA')
    .set(function (groupingsA) {
        this._groupingsA= groupingsA;
    })
    .get(function () {
        return this._groupingsA;
    });

oRptGroupingSchema.pre('save',
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

var oRptGrouping = mongoose.model('oRptGrouping', oRptGroupingSchema);
//if (typeofmodule != "undefined" && module.exports)
module.exports = oRptGrouping;
