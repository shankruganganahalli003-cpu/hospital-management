const express = require("express");
const { create, getall } = require("../controller/slotcontroller");
const isAuth = require("../middleware/isauth");
const router = express.Router();


router.post("/create/:doctorId",isAuth,create);
router.get("/getall",isAuth,getall);


module.exports = router;