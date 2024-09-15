const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const addUserValidationSchema = Joi.object({
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

const editUserValidationSchema = Joi.object({
  firstname: Joi.string().trim(),
  lastname: Joi.string().trim(),
  username: Joi.string().lowercase().trim(),
  password: Joi.string().min(8).pattern(passwordRegex),
  phoneNumber: Joi.string().trim(),
  address: Joi.string().trim(),
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
});

module.exports = { addUserValidationSchema, editUserValidationSchema };
