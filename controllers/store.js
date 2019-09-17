const StoreModel = require('../models/store.model');
const HttpStatus = require('http-status-codes');
const {
  handleError, handleSuccess, toKm, calDistance, config
} = require('../helpers/utils');

const {getStores} = require('../helpers/seed');
const NodeGeocoder = require('node-geocoder');
 
// node-geocoder options
const options = {
  provider: 'google', 
  httpAdapter: 'https', 
  apiKey: `${config.API_KEY}`, 
  formatter: null        
};
const path = require('path');

const geocoder = NodeGeocoder(options);
const StoreController = {
  /**
   * Closest Store (Mongodb)
   * @description return the closest store via query (using Mongodb)
   * @returns {Object} Store
   */
  store: async (req, res) => {
    try {
      let { zip, address, units } = req.query

      const query = {}
      
      // Geocoder accepts both zipcode and address in an `address` parameter
      if(zip) query.address = zip
      if(address) query.address = address

      // Decode passed in address/ ziocode
      let code = await geocoder.geocode(query)
      code = code[0]
      const zip_address_message = zip ? 'zip code does not exist' : 'address does not exist' 

      // return error details using our error handler
      if(!code) return handleError(res, HttpStatus.BAD_REQUEST, zip_address_message, null)
      
      // Mongodb's coordinate comparison
      const store = await StoreModel.findOne({
        geo: {
         $near: {
          $geometry: {
           type: "Point",
           coordinates: [code.longitude, code.latitude]
          }
         }
        }
       })

       if(!store) return handleError(res, HttpStatus.BAD_REQUEST, 'we do not have any stores available around this area', null)

      // Calculate distance between store's coordinates and user's coordinates as the crow flies. Using Havesine formula
      let distance = calDistance(code.latitude, store.geo.coordinates[1], code.longitude, store.geo.coordinates[0])
      units = units ? units : 'mi' 
      distance = units == 'km' ?  toKm(distance) : distance

      // Return store details
      return handleSuccess(res, HttpStatus.OK, { name: store.name, address: store.address, city: store.city, state: store.state, county: store.county, distance, units}, 'stores gotten successfully')
    } catch (error) {
      return handleError(res, HttpStatus.INTERNAL_SERVER_ERROR, 'An error occured getting all stores, please contact an administrator', error)
    }
  },

  /**
   * Closest Store (JS)
   * @description return the closest store via query (using Javascript)
   * @returns {Object} Store
   */
  nostore: async (req, res) => {
    try {
      let { zip, address, units } = req.query

      const query = {}
      
      // Geocoder accepts both zipcode and address in an `address` parameter
      if(zip) query.address = zip
      if(address) query.address = address

      let code = await geocoder.geocode(query)
      code = code[0]
      const zip_address_message = zip ? 'zip code does not exist' : 'address does not exist' 
      if(!code) return handleError(res, HttpStatus.BAD_REQUEST, zip_address_message, null)
      
      // convert locations to JSON from CSV file
      const csvFilePath = path.join(__dirname, '../store-locations.csv')
      const stores = await getStores(csvFilePath)

      // using Array.Reduce function
      const closest = stores.reduce(function(min, point) {
      const distance = calDistance(code.latitude, point.latitude, code.longitude, point.longitude)
        if (distance < min.distance) {
          min.point = point
          min.distance = distance;
        }
        return min;
      }, {point: code, distance: 1000000000});

      // Calculate distance between store's coordinates and user's coordinates as the crow flies. Using Havesine formula
      units = units ? units : 'mi' 
      distance = units == 'km' ?  toKm(closest.distance) : closest.distance
      const store = closest.point
      return handleSuccess(res, HttpStatus.OK, { name: store.name, address: store.address, city: store.city, state: store.state, county: store.county, distance, units}, 'stores gotten successfully')
    } catch (error) {
      return handleError(res, HttpStatus.INTERNAL_SERVER_ERROR, 'An error occured getting all stores, please contact an administrator', error)
    }
  },
};


module.exports = StoreController;
