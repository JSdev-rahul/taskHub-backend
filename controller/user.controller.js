const sendGreetingEmail = require("../utils/greetingEmail")
const users = require("../model/user.model")
const hashedPassword = require("../utils/hashPassword")
const renameFileWithExtension = require("../utils/renameFileWithExtension")
const UserController = {
  createUser: async (req, res) => {
    try {
      const { email } = req.body

      const isExit = await users.findOne({ email })
      if (isExit) {
        if (isExit.password == "") {
          const id = isExit?._id
          const newPath = await renameFileWithExtension(req.file)
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
          return res
            .status(200)
            .json({ result, message: "User Created Successfully" })
        }
        return res.status(404).json({ message: "Email is already taken" })
      }

      const newPath = await renameFileWithExtension(req.file)

      const savedUser = await new users({
        ...req.body,
        password: hashedPassword(req.body.password),
        avatar: newPath,
      }).save()
      sendGreetingEmail(savedUser)
      savedUser.password = undefined
      return res
        .status(201)
        .json({ result: savedUser, message: "User Created Successfully" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  getUsers: async (req, res) => {
    try {
      const result = await users.find()
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await users.findByIdAndDelete(id)
      return res.status(200).json({ result, message: "user deleted" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  updateUser: async (req, res) => {
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

module.exports = UserController
