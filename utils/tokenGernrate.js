const jwt = require("jsonwebtoken")
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY

const genrateAccessToken = async (userId) => {
  const accessToken = jwt.sign({ userId: userId }, accessTokenSecretKey, {
    expiresIn: accessTokenExpiry,
  })
  return accessToken
}
const genrateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ userId: userId }, refreshTokenSecretKey, {
    expiresIn: refreshTokenExpiry,
  })
  return refreshToken
}
const genrateTokens = async (user) => {
  const access_token = await genrateAccessToken(user._id)
  const refresh_token = await genrateRefreshToken(user._id)
  user.refreshToken = refresh_token
  await user.save({ validateBeforeSave: false })
  return { access_token, refresh_token }
}
module.exports = genrateTokens
