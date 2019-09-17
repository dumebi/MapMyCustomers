// Package Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const flash = require('connect-flash');
const {
  handleError
} = require('./helpers/utils');
const {seedStores} = require('./helpers/seed');
const app = express();
require('dotenv').config();
require('./helpers/connection').mongo();

// Midelware stack
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(flash());

/* Application Routes */
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return handleError(res, 404, 'Page Not Found')
});

(async () => {
  // Seed stores from CSV file into MongoDB
  const csvFilePath = './store-locations.csv'
  await seedStores(csvFilePath)
  // await getStores(csvFilePath)
  console.log('seeded')
})()

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
