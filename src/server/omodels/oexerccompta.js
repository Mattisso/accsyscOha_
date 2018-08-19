var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;


var oExercComptaSchema = new Schema(
  {
    oExercComptaId:
      {
        type: Number,
        index: true,
        required: true,
        unique: true
      },
    nttcomptebalances:
      [{
        type: ObjectId,
        ref: 'nttCompteBalance'
      }],
    nstbalances:
      [{
        type: ObjectId,
        ref: 'nstBalance'
      }],
    nttbalances:
      [{
        type: ObjectId,
        ref: 'nttBalance'
      }],
    oexercice:
      {
        type: ObjectId,
        ref: 'oExercice'
      },
    DateDebut:
      {
        type: Date,
        default:
          Date.now
      },
    Datefin:
      {
        type: Date,
        default:
          Date.now
      },
    Cloture:
      {
        type: Boolean,
        default:
          true
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
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

oExercComptaSchema.set('toObject', { getters: true });
oExercComptaSchema.set('toJSON', { getters: true });

oExercComptaSchema.pre('save',
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

var oExercCompta = mongoose.model('oExercCompta', oExercComptaSchema);
module.exports = oExercCompta;
