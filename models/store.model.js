const { Schema, model } = require('mongoose')

const StoreSchema = new Schema (
  {
    name: { type: Schema.Types.String, required: true },
    location: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
    location: { type: Schema.Types.String, required: true },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    zip_code: { type: Schema.Types.String, required: true },
    // MongoDB Geometric format
    geo: {
      type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
     },
    county: { type: Schema.Types.String, required: true },
    __v: { type: Number, select: false }
  },
  { timestamps: true }, { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)
// MongoDB Geometric index
StoreSchema.index({ "geo": "2dsphere"});
const Store = model('Store', StoreSchema)

module.exports = Store
