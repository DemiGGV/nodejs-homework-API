const express = require("express");
const controller = require("../../controllers/contacts.controller");

const { validateBody, isValidID, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact.model");

const router = express.Router();

router.get("/", authenticate, controller.listContacts);
router.get("/:contactId", authenticate, isValidID, controller.getContactById);
router.post(
  "/",
  authenticate,
  validateBody(schemas.contactSchema),
  controller.addContact
);
router.delete("/:contactId", isValidID, authenticate, controller.removeContact);
router.put(
  "/:contactId",
  authenticate,
  isValidID,
  validateBody(schemas.contactSchema),
  controller.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidID,
  validateBody(schemas.updFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
