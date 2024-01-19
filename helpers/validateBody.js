const joi = require("joi");

const HttpError = require("./HttpError.js");

const contactsSheme = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.string().required(),
});

const contactUpdateShema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().min(1).optional().email(),
  phone: joi.string().min(1).optional(),
});

module.exports = { contactsSheme, contactUpdateShema };
