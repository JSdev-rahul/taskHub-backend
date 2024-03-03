const users = require("../model/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const sendOtpToEmail = require("../utils/sendOtpToEmail")
const otpCtrl = require("./otp")
const otpGenerator = require("otp-generator")
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const { jwtDecode } = require("jwt-decode")
const saveImageToFileSystem = require("../utils/saveImageToFileSystem")
const sendGreetingEmail = require("../utils/greetingEmail")

const LoginCtrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await users.findOne({ email })

      const userName = user?.name
      if (!user) {
        return res.status(404).json({ message: "user not found" })
      }
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(404).json({ message: "password not match " })
      }
      const token = jwt.sign({ userId: user._id }, accessTokenSecretKey, {
        expiresIn: "1h",
      })
      user.password = undefined
      const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
      })

      otpCtrl.savedOtp(email, otp)
      sendOtpToEmail(userName, email, otp)
      res.status(200).json({ token, user, message: "Login Successfull" })
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
        }).save()
        sendGreetingEmail(user)
      }
      const token = jwt.sign({ userId: user._id }, accessTokenSecretKey, {
        expiresIn: accessTokenExpiry,
      })
      user.password = undefined

      return res.status(200).json({ token, user, message: "Login Successfull" })
    } catch (error) {
      console.error("Error:", error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  },
}

module.exports = LoginCtrl
