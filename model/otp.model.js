const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, default: Date.now, expires: 120 }, // Expiry set to 5 minutes
})

const OTPModel = mongoose.model("OTP", otpSchema)

module.exports = OTPModel
