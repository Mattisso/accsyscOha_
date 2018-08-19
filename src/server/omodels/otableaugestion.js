"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var otableauGestionSchema = new Schema(
    {
        RefGestionCode:
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
        NumCompte:
        {
            type: String
        },
        oreference: [
            {


                type: ObjectId,
                ref:'oReference'
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
    }
)

otableauGestionSchema.virtual('fullDescription').get(function () {
    return this.RefGestionCode + '-' + this.Description;
}
).set(function (v) {
    this.RefGestionCode = v.substr(0,
        v.indexOf(''));
    this.Description = v.substr(v.indexOf('') + 1);
}
    );

otableauGestionSchema.virtual('url').get(function () {
    return '/app/otableauGestion/' + this._id;
}
);


var otableauGestion = mongoose.model('otableauGestion', otableauGestionSchema);
//if (typeofmodule != "undefined" && module.exports)
    module.exports = otableauGestion;
