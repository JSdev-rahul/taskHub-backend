const express=require('express')
const UserCtrl = require('../controller/users')
const usersRoutes=express.Router()
const multer = require("multer");
const verifyToken = require('../middleware/authMiddleware');
const sendEmail = require('../middleware/emailMiddleware');
const upload = multer({ dest: "uploads/" });

usersRoutes.get('/',verifyToken,UserCtrl.getAllUsers)
usersRoutes.post('/', upload.single("avtar"),UserCtrl.createNewUser)
usersRoutes.delete('/:id',verifyToken,UserCtrl.deleteUserAccount)
usersRoutes.patch('/:id',verifyToken,UserCtrl.updateUserProfile)

module.exports=usersRoutes