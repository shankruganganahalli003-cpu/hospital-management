import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
    diagnosis: {
      type: String,
      default: "",
    },
    symptoms: {
      type: [String],
      default: [],
    },
    treatment: {
      type: String,
      default: "",
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    reports: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("MedicalRecord", medicalRecordSchema);