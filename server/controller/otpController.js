require("dotenv").config();
const nodemailer = require("nodemailer");

const otpStorage = {};
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
  } else {
    console.log("✅ SMTP Connected Successfully!");
  }
});

// OTP Generator
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Email Validator
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const otp = generateOtp();
    otpStorage[email] = { otp, expiry: Date.now() + OTP_EXPIRY_TIME };

    const mailOptions = {
      from: `"E-Learning Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).json({ message: `Failed to send OTP: ${error.message}` });
  }
};

// Verify OTP
const verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const storedOtpData = otpStorage[email];

    if (!storedOtpData) {
      return res.status(400).json({ message: "No OTP found for this email." });
    }

    const { otp: storedOtp, expiry } = storedOtpData;

    if (Date.now() > expiry) {
      delete otpStorage[email];
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    delete otpStorage[email];
    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("❌ OTP Verification Error:", error.message);
    res.status(500).json({ message: `Error verifying OTP: ${error.message}` });
  }
};

module.exports = { sendOtp, verifyOtp };
  