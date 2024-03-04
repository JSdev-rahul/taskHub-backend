const express = require("express")
const AuthController = require("../controller/auth.controller")
const AuthOTPController = require("../controller/authOTP.controller")
const verifyToken = require("../middlewares/auth.middleware")

const authRoute = express.Router()

authRoute.post("/", AuthController.emailPasswordLogin)
authRoute.post("/verify-otp", verifyToken, AuthOTPController.verifyOTP) // route /login/verify-otp
authRoute.post("/regnrate-otp", verifyToken, AuthOTPController.regenerateOTP)
authRoute.post("/google-auth", AuthController.googleAuthLogIn)

module.exports = authRoute
