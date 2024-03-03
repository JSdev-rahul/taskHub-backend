const express = require("express")
const UserCtrl = require("../controller/users")
const usersRoutes = express.Router()
const multer = require("multer")
const verifyToken = require("../middleware/authMiddleware")
const upload = multer({ dest: "uploads/" })

usersRoutes.get("/", verifyToken, UserCtrl.getAllUsers)
usersRoutes.post("/", upload.single("avatar"), UserCtrl.createNewUser)
usersRoutes.delete("/:id", verifyToken, UserCtrl.deleteUserAccount)
usersRoutes.patch("/:id", verifyToken, UserCtrl.updateUserProfile)

module.exports = usersRoutes
