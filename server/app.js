const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const coursesRoutes = require("./routes/courses");
const paymentRoutes = require("./routes/PaymentRoutes");
// Route Definitions
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use('/user', userRoutes);
app.use("/api/addcourses", coursesRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;

