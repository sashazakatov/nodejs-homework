const Joi = require('joi');

const emailScheme = Joi.object({
    email: Joi.string().required(),
})
module.exports = emailScheme;