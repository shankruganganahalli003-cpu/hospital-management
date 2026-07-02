const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// SEND EMAIL
const sendEmail = async (email, subject, message) => {
  return transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject,
    text: message,
  });
};

// GENERATE OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// ✅ export both properly
module.exports = {
  sendEmail,
  generateOTP,
};