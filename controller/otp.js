const emailOTPMiddleware = require("../middleware/emailOtpMiddleware");
const OTPModel = require("../model/otp");
const otpGenerator = require("otp-generator");

const otpCtrl = {
  savedOtp: async (email, otp) => {
    try {
      const existingOTPRecord = await OTPModel.findOne({ email });
      if (existingOTPRecord) {
        // Update the existing OTP record
        await OTPModel.findOneAndUpdate({ email }, { otp }, { new: true });
      } else {
        // Create a new OTP record if it doesn't exist
        await OTPModel.create({ email, otp });
      }
    } catch (error) {
      console.error("Error saving OTP:", error);
      throw new Error("Failed to save OTP");
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      // Find the OTP record for the given email
      const otpRecord = await OTPModel.findOne({ email });
      if (!otpRecord) {
        return res.status(400).json({ message: "OTP record not found" });
      }

      // Compare the provided OTP with the OTP from the database
      if (otpRecord?.otp === otp) {
        otpCtrl.deleteOTP(email, otp);
        return res.status(200).json({ message: "OTP verified" });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to verify OTP" });
    }
  },
  deleteOTP: async (email, otp) => {
    try {
      await OTPModel.deleteOne({ email, otp });
    } catch (error) {
      console.error("Error deleting OTP:", error);
      throw new Error("Failed to delete OTP");
    }
  },
  regenerateOTP: async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    try {
      // const user=
      const result = await OTPModel.findOneAndUpdate(
        { email },
        { otp },
        { new: true }
      );
      emailOTPMiddleware("user", email, otp);
      res.status(200).json({ message: "New OTP Send To Your Email" });
      
    } catch (error) {
      console.error("Error saving OTP:", error);
      throw new Error("Failed to save OTP");
    }
  },
};

module.exports = otpCtrl;
