const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const userSignupValidationSchema = Joi.object({
  firstname: Joi.string().required().trim(),
  lastname: Joi.string().required().trim(),
  username: Joi.string().required().lowercase().trim(),
  password: Joi.string().required().min(8).pattern(passwordRegex),
  phoneNumber: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  wishlist: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required(), // assuming id is a string
        name: Joi.string().required().trim(),
        price: Joi.number().required().min(0),
        discount: Joi.number().required().min(0).max(100), // Assuming discount is a percentage
        images: Joi.array()
          .items(Joi.string().uri())
          .default(['products-images-default.jpeg']),
      })
    )
    .default([]),
  role: Joi.string().valid('ADMIN', 'USER').uppercase().trim(),
});

const userLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userLoginValidationSchema, userSignupValidationSchema };
