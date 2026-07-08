const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    doctorId: {
      type:String,
      required:true
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    isBooked: {
        type:Boolean,
        default:false
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
  },
  { timestamps: true }
);

slotSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Slot",slotSchema);