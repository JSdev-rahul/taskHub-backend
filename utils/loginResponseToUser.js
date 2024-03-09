const genrateTokens = require("./tokenGernrate")

const sendLoginResponse = async (res, user, message) => {
  const { access_token, refresh_token } = await genrateTokens(user)
  user.password = undefined
  user.refreshToken = undefined
  const options = {
    httpOnly: true,
    secure: true,
  }
  res
    .status(200)
    // .cookie("access_token", access_token, options)
    // .cookie("refresh_token", refresh_token, options)
    .json({
      access_token,
      refresh_token,
      user,
      message,
    })
}

module.exports = sendLoginResponse
