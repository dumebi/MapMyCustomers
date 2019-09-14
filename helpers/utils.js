const nodemailer = require('nodemailer');
// const Constants = require('http-s')
require('dotenv').config();

exports.config = {
  jwt: process.env.JWT_SECRET,
  mongo: '',
  host: '',
  amqp_url: '',
  port: '',
  redis: '',
  API_KEY: process.env.API_KEY
}

console.log(process.env.MONGO_LAB_DEV, process.env.MONGO_LAB_PROD)

if (process.env.NODE_ENV === 'development') {
  this.config.mongo = `${process.env.MONGO_LAB_DEV}`
  this.config.host = `http://localhost:${process.env.PORT}/`
  this.config.db = 'mapmucustomers_test'
  this.config.amqp_url = `${process.env.AMQP_URL}`
  this.config.port = `${process.env.PORT}`
  this.config.redis = `${process.env.REDIS_URL}`
} else {
  this.config.mongo = `${process.env.MONGO_LAB_PROD}`
  this.config.host = `http://localhost:${process.env.PORT}/`
  this.config.db = 'mapmucustomers_test'
  this.config.amqp_url = `${process.env.CLOUDAMQP_URL}`
  this.config.port = `${process.env.PORT}`
  this.config.redis = `${process.env.REDIS_URL}`
}

console.log(this.config)

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

exports.handleError = (res, code, message) => {
  console.log(message)
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