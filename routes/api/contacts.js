const express = require("express");
const controller = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", controller.listContacts);
router.get("/:contactId", controller.getContactById);
router.post("/", validateBody(schemas.contactSchema), controller.addContact);
router.delete("/:contactId", controller.removeContact);
router.put(
  "/:contactId",
  validateBody(schemas.contactSchema),
  controller.updateContact
);

module.exports = router;
