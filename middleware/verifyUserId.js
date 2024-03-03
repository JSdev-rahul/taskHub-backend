const verfiyUserIDFromParams = (req, res, next) => {
  try {
    const { id } = req.params

    console.log(id, req.user)

    if (id && id != req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized. Please use a valid authentication token.",
      })
    }
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = verfiyUserIDFromParams
