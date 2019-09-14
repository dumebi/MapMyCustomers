const csv = require('csvtojson')
const StoreModel = require('../models/store.model')

exports.seedStores = async(path) => {
  try {
    const csvArray = await csv().fromFile(path)
    const options = { ordered: false }
    const storeObjects = csvArray.map((item) => {
      return { name: item['Store Name'], location: item['Store Location'], address: item['Address'], city: item['City'], state: item['State'], zip_code: item['Zip Code'], 
      location: {
        type: "Point",
        coordinates: [parseFloat(item['Longitude']), parseFloat(item['Latitude'])]
       }, county: item['County'] }
    })
    await StoreModel.collection.insertMany(storeObjects, options)
    
  } catch (error) {
    console.log(error)
  }
}