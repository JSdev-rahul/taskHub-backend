const otpGenerator = require("otp-generator")

const genrateOTPHandler = () => {
  const otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
  })

  return otp
}

module.exports = genrateOTPHandler
