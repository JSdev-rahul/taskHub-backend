// External dependencies
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { jwtDecode } = require("jwt-decode")

// Internal modules
const UserModel = require("../model/user.model")
const AuthOTPController = require("./authOTP.controller")
const genrateOTPHandler = require("../utils/genrateOTP")
const genrateTokens = require("../utils/tokenGernrate")
const saveImageToFileSystem = require("../utils/saveImageToFileSystem")
const sendGreetingEmail = require("../utils/greetingEmail")
const sendLoginResponse = require("../utils/loginResponseToUser")
const sendOtpToEmail = require("../utils/sendOtpToEmail")

// Environment variable
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET

const AuthController = {
  emailPasswordLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })

      const userName = user?.name
      if (!user) {
        return res.status(404).json({ message: "user not found" })
      }
      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        return res.status(404).json({ message: "password not match " })
      }

      const otp = genrateOTPHandler()
      AuthOTPController.savedOtp(email, otp)
      sendOtpToEmail(userName, email, otp)
      return res
        .status(200)
        .json({ message: "Email password Login Successfull" })
    } catch (error) {
      return res.status(500).json({ message: "Login failed" })
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
      let user = await UserModel.findOne({ email })
      if (!user) {
        const { url = "", public_id = "" } = await saveImageToFileSystem(
          picture,
          email
        )

        user = await new UserModel({
          email,
          name,
          role: "user",
          gender: "",
          password: "", // Assuming you handle password separately
          avatar: {
            url,
            public_id,
          }, // Corrected property name
        }).save({ validateBeforeSave: false })
        sendGreetingEmail(user)
      }

      sendLoginResponse(res, user)
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" })
    }
  },

  genrateNewAccessToken: async (req, res) => {
    try {
      const { refreshToken } = req.body
      const decodedToken = jwt.verify(refreshToken, refreshTokenSecretKey)

      const user = await UserModel.findOne({ _id: decodedToken?.userId })

      const { access_token, refresh_token } = await genrateTokens(user)

      return res.status(200).json({
        access_token,
        refresh_token,
        message: "New Access Token Successfully genrated",
      })
    } catch (error) {
      return res.status(500).json({ message: error?.message })
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body
      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: "user not found  " })
      }

      isPasswordMatch = await user.comparePassword(oldPassword)

      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Old password does not match the current password.",
        })
      }
      await user.updatePassword(newPassword)

      // await UserModel.findByIdAndUpdate(
      //   { _id: user?._id },
      //   {
      //     password: hashedPassword(newPassword),
      //   },
      //   {
      //     new: true,
      //   }
      // )
      return res.status(200).json({ message: "password updated ssuccessfully" })
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "something went wrong" })
    }
  },

  // formgot password latel

  sendForgotPasswordOtp: async (req, res) => {
    try {
      const { email } = req.body
      console.log("email")
      const user = await UserModel.findOne({ email })
      console.log("user", user)
      if (!user) {
        return res.status(400).json({ message: "email not found" })
      }

      const otp = genrateOTPHandler()
      AuthOTPController.savedOtp(email, otp)
      const userName = user?.name
      sendOtpToEmail(userName, email, otp)
      return res.status(200).json({ message: "OTP send to register email Id" })
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "something went wrong" })
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { newPassword, email } = req.body

      const user = await UserModel.findOne({ email })
      console.log("user", user)
      if (!user) {
        return res.status(400).json({ message: "user not found  " })
      }
      await user.updatePassword(newPassword)

      // const result = await UserModel.findByIdAndUpdate(
      //   id,
      //   {
      //     password: hashedPassword(newPassword),
      //   },
      //   { new: true }
      // )

      return res.status(200).json({ message: "password updated successfully" })
    } catch (error) {
      console.log("err", error)
      return res.status(500).json({ message: "password sucessfully" })
    }
  },
}

module.exports = AuthController
