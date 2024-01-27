const joi = require("joi");
const { Schema, model } = require("mongoose");

const constactShema = new Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  favorite: { type: Boolean, default: false },
});

const Contact = model("contact", constactShema);

const contactsSheme = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.string().required(),
  favorite: joi.boolean().optional(),
});

const contactUpdateShema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().min(1).optional().email(),
  phone: joi.string().min(1).optional(),
  favorite: joi.boolean().optional(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  contactsSheme,
  contactUpdateShema,
  updateFavoriteSchema,
  Contact,
};
