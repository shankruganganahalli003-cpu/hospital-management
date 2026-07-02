const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user");
const { sendEmail, generateOTP } = require("../email");

const storedOtp = {};
const pendingUsers = {};
router.post("/send-otp", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  const otp = generateOTP();
  storedOtp[email] = otp;
  pendingUsers[email] = { name, email, password };

  await sendEmail(email, "OTP", `Your OTP is ${otp}`);

  return res.json({
    success: true,
    message: "OTP sent",
  });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const stored = storedOtp[email];
  const pending = pendingUsers[email];

  if (!stored || !pending) {
    return res.status(400).json({
      success: false,
      message: "OTP expired or registration data not found",
    });
  }

  if (stored.toString() !== otp.toString()) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const existing = await User.findOne({ email: pending.email });
  if (existing) {
    delete storedOtp[email];
    delete pendingUsers[email];
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  const hash = await bcrypt.hash(pending.password, 10);

  const user = await User.create({
    name: pending.name,
    email: pending.email,
    password: hash,
    role:"patient"
  });

  delete storedOtp[email];
  delete pendingUsers[email];

  return res.json({
    success: true,
    message: "OTP verified and user saved successfully",
    user,
  });
});

module.exports = router;