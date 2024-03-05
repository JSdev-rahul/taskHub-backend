const express = require("express")
const UserController = require("../controller/user.controller")
const multer = require("multer")
const verifyToken = require("../middlewares/auth.middleware")
const upload = multer({ dest: "uploads/" })

const userRoute = express.Router()

userRoute.get("/", verifyToken, UserController.getUsers)
userRoute.post("/", upload.single("avatar"), UserController.createUser)
userRoute.delete("/:id", verifyToken, UserController.deleteUser)
userRoute.patch("/:id", verifyToken, UserController.updateUser)
userRoute.post(
  "/update-avatar",
  verifyToken,
  upload.single("avatar"),
  UserController.updateUserAvtar
)
module.exports = userRoute
