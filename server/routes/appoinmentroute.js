const express = require("express");
const { create, getme } = require("../controller/appointmentcontroller");
const isAuth = require("../middleware/isauth");
const router = express.Router();

router.post("/create/:doctorId",isAuth,create);
router.get("/getme/:appointmentId",isAuth,getme);






module.exports = router ;