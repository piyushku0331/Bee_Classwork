require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const validator = require('validator');
const OTP = require('../models/otp');

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not set in the environment variables');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const sendOtpEmail = async (toEmail) => {
  if (!validator.isEmail(toEmail)) {
    throw new Error('Invalid email format');
  }
  toEmail = toEmail.trim().toLowerCase();

  const otp = generateOtp();
  const transporter = createTransporter();

  await OTP.create({ email: toEmail, otp });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    html: `<h3>Your OTP code is: <b>${otp}</b></h3><p>This OTP will expire in 5 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${toEmail}`);
  } catch (err) {
    console.error("Failed to send OTP:", err.message);
    throw new Error('Could not send OTP email');
  }

  return { success: true, message: 'OTP sent successfully' };
};

module.exports = { sendOtpEmail };
