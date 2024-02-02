const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/authControllers");
const authenticate = require("../middlewares/authenticate.js");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
