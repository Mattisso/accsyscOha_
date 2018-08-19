var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oExerciceSchema = new Schema(
  {
    oExerciceEncour:
      {
        type: Number
      },
    ExercicePrev:
      {
        type: Number
      },
    _oexerccompta_id:
      {
        type: ObjectId,
        ref: 'oExercCompta'
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
      }
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);
oExerciceSchema.set('toObject', { getters: true });
oExerciceSchema.set('toJSON', { getters: true });

oExerciceSchema.pre('save',
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

var oExercice = mongoose.model('oExercice', oExerciceSchema);
//if (typeofmodule != "undefined" && module.exports)
module.exports = oExercice;
