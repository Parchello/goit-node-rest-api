const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/authControllers");
const authenticate = require("../middlewares/authenticate.js");
const upload = require("../middlewares/upload.js");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

module.exports = router;
