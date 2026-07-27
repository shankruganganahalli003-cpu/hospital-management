const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    feesPerConsultation: {
      type: Number,
      required: true,
    },
    appointmentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Appointment",
  default: null,
},
    about: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);