// contains all of Joi validation schemas

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// custom validator func to check if a string is valid URL
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    // if is URL, return value
    return value;
  }
  // if not, return Joi error
  return helpers.error("string.uri");
};

// Validator for clothing item body
const validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.required": 'The "weather" field is required',
      "any.only": 'The "weather" field must be one of [hot, warm, cold]',
    }),
  }),
});

// Validator for signup
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validator for login
const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// validator IDs (user/item routes)
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": '"itemId" must be a valid hexadecimal string',
      "string.length": '"itemId" must be 24 characters long',
    }),
  }),
});

module.exports = {
  validateClothingItemBody,
  validateUserBody,
  validateLoginBody,
  validateId,
};
