const StoreModel = require('../models/store.model');
const HttpStatus = require('http-status-codes');
const {
  handleError, handleSuccess, toKm, calDistance
} = require('../helpers/utils');
const API_KEY = 'AIzaSyCQz-4BVOJd1kTCBkn7FDTy9hlxHzEkB2A'
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google', 
  httpAdapter: 'https', // Default
  apiKey: API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
const StoreController = {
  /**
   * Offers
   * @description Get all comflo offers
   * @returns {Array} Offers
   */
  store: async (req, res) => {
    try {
      let { zip, address, units } = req.query

      const query = {}
      if(zip) query.address = zip
      if(address) query.address = address

      let code = await geocoder.geocode(query)
      code = code[0]
      // console.log('code', code)
      if(!code) return handleError(res, HttpStatus.BAD_REQUEST, 'zip code does not exist', null)
      

      // const count = await StoreModel.estimatedDocumentCount({})
      // console.log('count ', count)
      const store = await StoreModel.findOne({
        location: {
         $near: {
          $geometry: {
           type: "Point",
           coordinates: [code.longitude, code.latitude]
          }
         }
        }
       })

       if(!store) return handleError(res, HttpStatus.BAD_REQUEST, 'we do not have any stores available around this area', null)
      //  console.log(store)

      let distance = calDistance(code.latitude, store.location.coordinates[1], code.longitude, store.location.coordinates[0])
      units = units ? units : 'mi' 
      distance = units == 'km' ?  toKm(distance) : distance
      // console.log('stores %o', distance)
      return handleSuccess(res, HttpStatus.OK, {store, distance, units}, 'stores gotten successfully')
    } catch (error) {
      // console.log(error)
      return handleError(res, HttpStatus.INTERNAL_SERVER_ERROR, 'An error occured getting all stores, please contact an administrator', error)
    }
  },
};
module.exports = StoreController;
