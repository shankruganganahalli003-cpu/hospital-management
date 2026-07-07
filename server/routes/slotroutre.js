const express = require("express");
const { create, getall } = require("../controller/slotcontroller");
const isAuth = require("../middleware/isauth");
const router = express.Router();


router.post("/create",isAuth,create);
router.get("/getall",getall);


module.exports = router;