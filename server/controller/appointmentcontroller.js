const appointmentmodel = require("../models/appointmentmodel");

module.exports.create = async (req, res) => {
  try {
    const userId = req.userId;
    const doctorId = req.params.doctorId;


    const {
      durationMinutes,
      availableDays,
      morningTime,
      eveningTime,
      amount,
      notes,
    } = req.body;

    if (
      !durationMinutes ||
      !availableDays ||
      !morningTime ||
      !eveningTime ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if(!userId && !doctorId){
        return res.status(400).json({message:"Id not found"})
    }

    const existAppointment = await appointmentmodel.find({userId});

    if(existAppointment){
      return res.status(400).json({message:"Appointment already exist"});
    }

const createAppointment = await appointmentmodel.create({
  userId,
  doctorId,
  durationMinutes,
  availableDays,
  morningTime,
  eveningTime,
  amount,
  notes: notes || "",
});

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      createAppointment,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};