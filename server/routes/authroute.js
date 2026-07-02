const express = require("express");
const { register, login } = require("../controller/authcontroller");
const { googleLogin } = require("../controller/oAuth");
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google-login").post(googleLogin);



module.exports = router;