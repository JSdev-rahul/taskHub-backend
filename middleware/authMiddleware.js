const jwt = require("jsonwebtoken")
const mySceretKey = process.env.API_SECRET_KEY
function verifyToken(req, res, next) {
  const token = req.header("Authorization")

  if (!token) return res.status(401).json({ error: "Access denied" })
  try {
    const tokenWithBearer = token?.substring(7)
    const decoded = jwt.verify(tokenWithBearer, mySceretKey)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = verifyToken
