const Joi = require('joi');

const createUserValidate = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required().min(8),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
});

const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required(),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().required().min(8),
  newPassword: Joi.string().required().min(8),
});


module.exports = {
  createUserValidate,
  loginValidation,
  changePasswordValidation,
};