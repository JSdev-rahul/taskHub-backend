const users = require("../model/users")
const bcrypt = require("bcrypt")
const sendOtpToEmail = require("../utils/sendOtpToEmail")
const otpCtrl = require("./otp")
const { jwtDecode } = require("jwt-decode")
const saveImageToFileSystem = require("../utils/saveImageToFileSystem")
const sendGreetingEmail = require("../utils/greetingEmail")
const genrateTokens = require("../utils/tokenGernrate")
const genrateOTPHandler = require("../utils/genrateOTP")

const sendSuccessLoginResponse = async (res, user) => {
  const { access_token, refresh_token } = await genrateTokens(user)
  user.password = undefined
  user.refreshToken = undefined
  res.status(200).json({
    access_token,
    refresh_token,
    user,
    message: "Login Successfull",
  })
}

const LoginCtrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await users.findOne({ email })

      const userName = user?.name
      if (!user) {
        return res.status(404).json({ message: "user not found" })
      }
      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        return res.status(404).json({ message: "password not match " })
      }

      const otp = genrateOTPHandler()
      otpCtrl.savedOtp(email, otp)
      sendOtpToEmail(userName, email, otp)
      sendSuccessLoginResponse(res, user)
    } catch (error) {
      res.status(500).json({ message: "Login failed" })
    }
  },

  googleAuthLogIn: async (req, res) => {
    try {
      const { Gtoken } = req.body
      if (!Gtoken) {
        return res.status(400).json({ message: "Token is required" })
      }
      const userInfo = jwtDecode(Gtoken)
      const { email, name, picture } = userInfo
      let user = await users.findOne({ email })
      if (!user) {
        const avatarPath = await saveImageToFileSystem(picture, email)
        user = await new users({
          email,
          name,
          role: "user",
          gender: "",
          password: "", // Assuming you handle password separately
          avatar: avatarPath, // Corrected property name
        }).save({ validateBeforeSave: false })
        sendGreetingEmail(user)
      }

      sendSuccessLoginResponse(res, user)
    } catch (error) {
      console.error("Error:", error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  },
}

module.exports = LoginCtrl
