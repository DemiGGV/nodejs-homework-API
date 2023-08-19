const express = require("express");
const controller = require("../../controllers/contacts.controller");

const { validateBody, isValidID } = require("../../middlewares");
const { schemas } = require("../../models/contact.model");

const router = express.Router();

router.get("/", controller.listContacts);
router.get("/:contactId", isValidID, controller.getContactById);
router.post("/", validateBody(schemas.contactSchema), controller.addContact);
router.delete("/:contactId", isValidID, controller.removeContact);
router.put(
  "/:contactId",
  isValidID,
  validateBody(schemas.contactSchema),
  controller.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidID,
  validateBody(schemas.updFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
