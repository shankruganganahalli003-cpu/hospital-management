const express = require("express");
const { create } = require("../controller/appointmentcontroller");
const isAuth = require("../middleware/isauth");
const router = express.Router();

router.post("/create/:doctorId",isAuth,create);






module.exports = router ;