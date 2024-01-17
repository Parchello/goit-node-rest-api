const contactsService = require("../services/contactsServices.js");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactId(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

// const deleteContact = (req, res) => {};

// const createContact = (req, res) => {};

// const updateContact = (req, res) => {};

module.exports = {
  getAllContacts,
  getContactById,
  //   deleteContact,
  //   createContact,
  //   updateContact,
};
