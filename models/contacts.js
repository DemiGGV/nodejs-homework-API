const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  return contacts;
};

const getContactById = async (contactId) => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) return null;
  return contact;
};

const removeContact = async (contactId) => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

const addContact = async (body) => {
  const contact = {
    id: crypto.randomUUID(),
    ...body,
  };
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
