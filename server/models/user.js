const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: null,
  },

  phone: {
    type: String,
    default: "",
  },

 role: {
  type: String,
  enum: ["admin", "doctor", "patient", "nurse"],
  default: "patient"
},

  profileImage: {
    type: String,
    default: "",
  },

  googleId: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("usermodel",userschema);