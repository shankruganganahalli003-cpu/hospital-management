const appointmentmodel = require("../models/appointmentmodel");
const doctormodel = require("../models/doctormodel");

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

    const existAppointment = await appointmentmodel.findOne({ userId });
    if (existAppointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment already exists",
      });
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

    const updatedDoctor = await doctormodel.findOneAndUpdate(
      { _id: doctorId },
      { appointmentId: createAppointment._id },
      { returnDocument: "after" }
    );

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      createAppointment,
      updatedDoctor,
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

module.exports.getme = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.userId;

    const getme = await appointmentmodel.findById(appointmentId);
    const doctor = await appointmentmodel.findOne({ userId }).populate("doctorId");

    return res.status(200).json({
      success: true,
      getme,
      doctor,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};