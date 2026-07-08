const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type:String,
      required: true,
    },
    
    durationMinutes:{
      type:String,
      required:true
    },
    availableDays:{
      type:[String],
      required:true
    },
    morningTime:{
      type:String,
      required:true
    },

    eveningTime:{
      type:String,
      required:true
    },

    amount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Appointment", appointmentSchema);