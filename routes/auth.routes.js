const express = require("express")
const AuthController = require("../controller/auth.controller")
const AuthOTPController = require("../controller/authOTP.controller")

const authRoute = express.Router()

authRoute.post("/", AuthController.emailPasswordLogin)
authRoute.post("/verify-otp", AuthOTPController.verifyOTP) // route /login/verify-otp
authRoute.post("/regnrate-otp", AuthOTPController.regenerateOTP)
authRoute.post("/google-auth", AuthController.googleAuthLogIn)
authRoute.post("/generate-access-token", AuthController.genrateNewAccessToken)
authRoute.patch("/update-password", AuthController.changePassword)
authRoute.post("/send-otp", AuthController.sendForgotPasswordOtp)
authRoute.post("/forgot-password", AuthController.forgotPassword)
module.exports = authRoute
