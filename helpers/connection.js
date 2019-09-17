const mongoose = require('mongoose');
const {config} = require('../helpers/utils');
require('dotenv').config();

// Mongodb config
module.exports = {
  mongo() {
    mongoose.promise = global.promise;
    mongoose
      .connect(config.mongo, {
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500
      })
      .then(() => {
        console.log('MongoDB is connected')
      })
      .catch((err) => {
        console.log(err)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(this.mongo, 5000)
      })
  }
}
