const Joi = require('joi');

const registerScheme = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
})

module.exports = registerScheme;