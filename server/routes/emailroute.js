const express = require("express");
const router = express.Router();

const { sendEmail, generateOTP } = require("../email");

// ✅ MUST be outside routes (GLOBAL memory)
const storedOtp = {};

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();

  storedOtp[email] = otp;



  await sendEmail(email, "OTP", `Your OTP is ${otp}`);

  res.json({
    success: true,
    message: "OTP sent",
  });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;



  const stored = storedOtp[email];

  if (!stored) {
    return res.status(400).json({
      success: false,
      message: "OTP expired or not found",
    });
  }

  if (stored.toString() !== otp.toString()) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  delete storedOtp[email];

  return res.json({
    success: true,
    message: "OTP verified successfully",
  });
});

module.exports = router;