require('dotenv').config();

/**
 * Application Config
 * @description Appplication config variables gotten from process.env
 * @returns {null}
 */
exports.config = {
  jwt: process.env.JWT_SECRET,
  mongo: `${process.env.MONGO_LAB_DEV}`,
  host: `http://localhost:${process.env.PORT}/`,
  port: `${process.env.PORT}`,
  API_KEY: process.env.API_KEY
}

/**
 * Degree to Radian
 * @description Convert degrees to radians
 * @returns {Float} radian
 */
exports.deg2rad = (deg) => {
  return deg * (Math.PI/180)
},

/**
 * Miles to Kilometers
 * @description Convert miles to km
 * @returns {Float} KM
 */
exports.toKm = (miles) => {
  return miles * 1.60934
},

/**
 * Calculate Distance
 * @description calculates geometric distance of two points using Havesine Formula
 * @returns {Float} KM
 */
exports.calDistance = (lat1, lat2, lon1, lon2) => {
  var R = 3958.8; // Radius of the earth in km
  var φ1 = this.deg2rad(lat1);
  var φ2 = this.deg2rad(lat2);
  var Δφ = this.deg2rad(lat2-lat1);
  var Δλ = this.deg2rad(lon2-lon1);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d
},


/**
 * Handle Error
 * @description Error Handler, returns error details in specified JSON format
 * @returns {Object} error
 */
exports.handleError = (res, code, message, err) => {
  console.log(err)
  return res.status(parseInt(code, 10)).json({
    status: 'error',
    message
  })
}

/**
 * Handle Success
 * @description Success Handler, returns success details in specified JSON format
 * @returns {Object} details
 */
exports.handleSuccess = (res, code, data) => {
  return res.status(parseInt(code, 10)).json({
    status: 'success',
    data
  })
}