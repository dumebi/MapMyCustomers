const express = require('express');
const StoreController = require('../controllers/store')
const {store} = require('../validation/store.validation')

const router = express.Router();

/**
 * Store Routes
 */

// Using MongoDB
router.get('/closest', store, StoreController.store);
// Using pureJS
router.get('/noclosest', store, StoreController.nostore);
module.exports = router;
