const Joi = require("joi");

exports.signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("consumer", "creator", "brand").required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
