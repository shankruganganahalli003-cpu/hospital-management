const express = require("express");
const { create, getall, update, deletedoctor, getme, fetchAppoitmentWithDoctorId } = require("../controller/doctorcontroller");
const isauth = require("../middleware/isauth");
const { deleteModel } = require("mongoose");
const router = express.Router();


router.post("/create",isauth,create);
router.get("/getall",isauth,getall);
router.put("/update/:id",isauth,update);
router.delete("/delete/:id",isauth,deletedoctor);
router.get("/getme",isauth,getme);
router.get("/getone/:doctorId",isauth,fetchAppoitmentWithDoctorId);


module.exports = router;