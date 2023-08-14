const contacts = require("../models");
const { HttpError, ctrlWrap } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) throw HttpError(404, "Not Found");
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrap(listContacts),
  getContactById: ctrlWrap(getContactById),
  removeContact: ctrlWrap(removeContact),
  addContact: ctrlWrap(addContact),
  updateContact: ctrlWrap(updateContact),
};
