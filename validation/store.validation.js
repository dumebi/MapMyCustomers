const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const {
  handleError
} = require('../helpers/utils');

exports.store = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      zip: Joi.string(),
      address: Joi.string(),
      units: Joi.string()
    }).xor('zip', 'address').label('Query');
    const schemaVal = await schema.validate(req.query);
    if(schemaVal.error) throw schemaVal.error
    // console.log(schemaVal)
    next()
  } catch (error) {
    console.log(error)
    return handleError(res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

