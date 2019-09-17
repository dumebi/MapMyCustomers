const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const {
  handleError
} = require('../helpers/utils');

/**
 * StoreValidation
 * @description Validates Query against zip, addressa and units
 * @returns {Object} Store
 */
exports.store = async (req, res, next) => {
  try {
    // Makes sure either zip or address is passed, but not both at the same time
    const schema = Joi.object().keys({
      zip: Joi.string(),
      address: Joi.string(),
      units: Joi.string()
    }).xor('zip', 'address').label('Query');
    const schemaVal = await schema.validate(req.query);
    if(schemaVal.error) throw schemaVal.error
    next()
  } catch (error) {
    return handleError(res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

