const { Schema, model } = require('mongoose')

const StoreSchema = new Schema (
  {
    name: { type: Schema.Types.String, required: true },
    location: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    zip_code: { type: Schema.Types.String, required: true },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
     },
    // latitude: { type: Schema.Types.String, required: true },
    // longitude: { type: Schema.Types.String, required: true },
    county: { type: Schema.Types.String, required: true },
    __v: { type: Number, select: false }
  },
  { timestamps: true }, { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)
StoreSchema.index({ "location": "2dsphere"});
// StoreSchema.createIndex({"location": '2dsphere'});
// db.stores.createIndex({ "location": "2dsphere"})
const Store = model('Store', StoreSchema)

module.exports = Store
