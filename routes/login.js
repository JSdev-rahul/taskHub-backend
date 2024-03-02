const express = require("express")
const LoginCtrl = require("../controller/login")
const otpCtrl = require("../controller/otp")
const verifyToken = require("../middleware/authMiddleware")

const loginRoute = express.Router()

loginRoute.post("/", LoginCtrl.login)
loginRoute.post("/verify-otp", verifyToken, otpCtrl.verifyOTP) // route /login/verify-otp
loginRoute.post("/regnrate-otp", verifyToken, otpCtrl.regenerateOTP)
loginRoute.post("/google-auth", LoginCtrl.googleAuthLogIn)

module.exports = loginRoute
