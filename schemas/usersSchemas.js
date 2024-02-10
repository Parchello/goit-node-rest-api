const joi = require("joi");
const { Schema, model } = require("mongoose");

const userShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      minlenght: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  subscription: joi.string().optional(),
});

const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
});

const User = model("user", userShema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
};
