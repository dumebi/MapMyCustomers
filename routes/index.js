const express = require('express');
const StoreController = require('../controllers/store')
const {store} = require('../validation/store.validation')

const router = express.Router();

/**
 * Store Routes
 */
router.get('/closest', store, StoreController.store);
module.exports = router;
