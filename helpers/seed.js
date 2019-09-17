const csv = require('csvtojson')
const StoreModel = require('../models/store.model')

/**
 * Seed Stores
 * @description seed the values from our CVS file into a MongoDB database
 * @returns {null}
 */
exports.seedStores = async(path) => {
  try {
    const csvArray = await csv().fromFile(path)
    const options = { ordered: false }
    const storeObjects = csvArray.map((item) => {
      return { name: item['Store Name'], location: item['Store Location'], address: item['Address'], city: item['City'], state: item['State'], zip_code: item['Zip Code'], 
      geo: {
        type: "Point",
        coordinates: [parseFloat(item['Longitude']), parseFloat(item['Latitude'])]
       }, county: item['County'], longitude: parseFloat(item['Longitude']), latitude: parseFloat(item['Latitude']) }
    })
    await StoreModel.collection.insertMany(storeObjects, options)  
  } catch (error) {
    console.log(error)
  }
}

/**
 * Get Stores
 * @description returns the values from our CVS file in a JSON format
 * @returns {null}
 */
exports.getStores = async(path) => {
  try {
    const csvArray = await csv().fromFile(path)
    const storeObjects = csvArray.map((item) => {
      return { name: item['Store Name'], location: item['Store Location'], address: item['Address'], city: item['City'], state: item['State'], zip_code: item['Zip Code'], 
      county: item['County'], longitude: parseFloat(item['Longitude']), latitude: parseFloat(item['Latitude']) }
    })
    return storeObjects    
  } catch (error) {
    console.log(error)
  }
}

exports.stores;