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

const sendEmail = async (email, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject,
      text: message,
    });

    console.log(info);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = {
  sendEmail,
  generateOTP,
};