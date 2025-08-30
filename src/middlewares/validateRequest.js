const Joi = require('joi');

/**
 * Middleware para validar dados da requisição com Joi
 * @param {Joi.Schema} schema
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

module.exports = validateRequest;