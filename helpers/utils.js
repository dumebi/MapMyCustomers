require('dotenv').config();

exports.config = {
  jwt: process.env.JWT_SECRET,
  mongo: `${process.env.MONGO_LAB_DEV}`,
  host: `http://localhost:${process.env.PORT}/`,
  port: `${process.env.PORT}`,
  API_KEY: process.env.API_KEY
}

// Convert degrees to radians
exports.deg2rad = (deg) => {
  return deg * (Math.PI/180)
},

// Convert miles to km
exports.toKm = (miles) => {
  return miles * 1.60934
},

// Havesine Formula
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

exports.handleError = (res, code, message, err) => {
  console.log(err)
  return res.status(parseInt(code, 10)).json({
    status: 'error',
    message
  })
}

exports.handleSuccess = (res, code, data) => {
  return res.status(parseInt(code, 10)).json({
    status: 'success',
    data
  })
}