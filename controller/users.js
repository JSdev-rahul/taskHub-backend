const sendGreetingEmail = require("../utils/greetingEmail")
const users = require("../model/users")
const hashedPassword = require("../utils/hashPassword")
const renameFileWithExtension = require("../utils/renameFileWithExtension")
const UserCtrl = {
  createNewUser: async (req, res) => {
    try {
      const { email } = req.body

      const isExit = await users.findOne({ email })
      if (isExit) {
        if (isExit.password == "") {
          const id = isExit?._id
          const newPath = await renameFileWithExtension(req.file)

          console.log("newPath", newPath)

          const result = await users.findByIdAndUpdate(
            id,
            {
              ...req.body,
              password: hashedPassword(req.body.password),
              avatar: newPath.replace("uploads/", ""),
            },
            {
              new: true,
            }
          )
          return res.status(200).json(result)
        }
        return res.status(404).json({ message: "Email is already taken" })
      }

      const newPath = await renameFileWithExtension(req.file)
      console.log("newPath", newPath)
      const savedUser = await new users({
        ...req.body,
        password: hashedPassword(req.body.password),
        avatar: newPath?.replace("uploads/", ""),
      }).save()
      sendGreetingEmail(savedUser)
      savedUser.password = undefined
      return res.status(201).json({ message: "User Created Successfully" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const result = await users.find()
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  deleteUserAccount: async (req, res) => {
    try {
      const id = req.params.id
      const result = await users.findByIdAndDelete(id)
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const id = req.params.id
      const result = await users.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      )
      return res.status(200).json(result)
    } catch (error) {}
  },
}

module.exports = UserCtrl
