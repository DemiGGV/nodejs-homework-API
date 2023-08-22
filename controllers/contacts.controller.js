const { HttpError, ctrlWrap } = require("../helpers");
const { Contact } = require("../models/contact.model");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (!favorite) {
    const result = await Contact.find({ owner }, {}, { skip, limit });
    res.json(result);
    return;
  }
  const result = await Contact.find({ owner, favorite }, {}, { skip, limit });
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  if (!result) throw HttpError(404, "Not Found");
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrap(listContacts),
  getContactById: ctrlWrap(getContactById),
  removeContact: ctrlWrap(removeContact),
  addContact: ctrlWrap(addContact),
  updateContact: ctrlWrap(updateContact),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
