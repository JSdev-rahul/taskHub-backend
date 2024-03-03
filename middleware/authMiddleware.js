const jwt = require("jsonwebtoken")
const users = require("../model/users")
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET
async function verifyToken(req, res, next) {
  const token = req.header("Authorization")

  try {
    if (!token) return res.status(401).json({ error: "Access denied" })

    const tokenWithOutBearer = token?.substring(7)
    const decodedToken = jwt.verify(tokenWithOutBearer, accessTokenSecretKey)

    const user = await users.findOne({ _id: decodedToken?.userId })
    if (!user) {
      throw new error(
        res.status(401).json({ error: "Invalid token user not found" })
      )
    }
    // console.log("verifyUser", verifyUser)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = verifyToken
