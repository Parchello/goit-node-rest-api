const joi = require("joi");

const HttpError = require("./HttpError.js");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const contactsSheme = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.string().required(),
});

const contactUpdateShema = joi.object({
  name: joi.string().min(1).optional(),
  email: joi.string().min(1).optional().email(),
  phone: joi.string().min(1).optional(),
});

module.exports = { validateBody, contactsSheme, contactUpdateShema };
