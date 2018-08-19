var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oGestionSchema = new Schema(
    {
        _refcodeogestion_id: {
            type: ObjectId,
            ref: 'oReference',

        },

        _ocomptegestion_id: {
                type: ObjectId,
                ref: 'oCompte',
            },
            oreferences: [{
                _oreference : {
                    type: ObjectId,
                    ref: 'oReference',

                }
            }],

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

    oGestionSchema.set('toObject', { getters: true });
    oGestionSchema.set('toJSON', { getters: true });

    oGestionSchema.virtual('oreference')
    .set(function(oreference){
        this._oreference = oreference;
        })
        .get(function() {
        return this._oreference;
        });

 /*

oGestionSchema.virtual('url').get(function () {
    return '/app/oGestion/' + this._id;
}
);*/
oGestionSchema.index(
	{
		_refcodeogestion_id: 1,
    _ocomptegestion_id: 1,
    'oreferences.oreferences':1

	}
);

oGestionSchema.pre('save',
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


var oGestion = mongoose.model('oGestion', oGestionSchema);

    module.exports = oGestion;
