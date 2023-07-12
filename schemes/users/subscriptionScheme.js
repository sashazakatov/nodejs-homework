const Joi = require('joi');

const subscriptionScheme = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
})

module.exports = subscriptionScheme;