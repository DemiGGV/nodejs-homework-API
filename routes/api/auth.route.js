const express = require("express");
const ctrl = require("../../controllers/auth.controller");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user.model");

const router = express.Router();

router.post("/register", validateBody(schemas.signupSchema), ctrl.signup);
router.get("/verify/:verificationToken", ctrl.verifyAuth);
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendEmail
);
router.post("/login", validateBody(schemas.signinSchema), ctrl.signin);
router.post("/logout", authenticate, ctrl.signout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updSubscriptionSchema),
  ctrl.updSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updAvatar);

module.exports = router;
