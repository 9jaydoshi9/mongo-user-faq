const Joi = require("joi");

const addCategoryValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const addFaqValidation = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  categoryId: Joi.string(),
});

const deleteFaqValidation = Joi.object({
  faqId: Joi.string().required(),
  userId: Joi.string().required(),
});

const editFaqValidation = Joi.object({
  faqId: Joi.string().required(),
  userId: Joi.string().required(),
  question: Joi.string(),
  answer: Joi.string(),
});

module.exports = {
  addCategoryValidation,
  addFaqValidation,
  deleteFaqValidation,
  editFaqValidation,
};
