const HttpError = require("../helpers/HttpError.js");
const {
  contactsSheme,
  contactUpdateShema,
} = require("../helpers/validateBody.js");
const contactsService = require("../services/contactsServices.js");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactId(id);
    if (!result) {
      return res.status(404).json({ message: "Contact is not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      return res.status(404).json({ message: "Contact is not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = contactsSheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsService.updateById({ id, name, email, phone });
    if (!result) {
      return res.status(404).json({ message: "Contact is not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
