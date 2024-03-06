const sendGreetingEmail = require("../utils/greetingEmail")
const UserModel = require("../model/user.model")
const hashedPassword = require("../utils/hashPassword")
const renameFileWithExtension = require("../utils/renameFileWithExtension")
const deleteOldFilesOnCloudinary = require("../utils/deleteFilesOnCludinary")

const UserController = {
  createUser: async (req, res) => {
    try {
      const { email } = req.body
      const isExit = await UserModel.findOne({ email })
      if (isExit) {
        if (isExit.password == "") {
          const id = isExit?._id
          const { url, public_id } = await renameFileWithExtension(
            req.file,
            isExit?.avatar?.public_id
          )
          const result = await UserModel.findByIdAndUpdate(
            id,
            {
              ...req.body,
              password: hashedPassword(req.body.password),
              avatar: {
                url,
                public_id,
              },
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

      const { url, public_id } = await renameFileWithExtension(req.file, "")

      const savedUser = await new UserModel({
        ...req.body,
        password: hashedPassword(req.body.password),
        avatar: {
          url,
          public_id,
        },
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
      // const result = await UserModel.find()
      const { page = 1, limit = 5, q = "", filter } = req.query

      const query = { name: { $regex: q, $options: "i" } }

      if (filter) {
        query.role = filter
      }

      const totalCount = await UserModel.countDocuments(query)

      const result = await UserModel.aggregate([
        {
          $match: query,
        },
        {
          $skip: page * limit - limit,
        },
        {
          $limit: Number(limit),
        },
        {
          $lookup: {
            from: "todos",
            localField: "_id",
            foreignField: "user",
            as: "result",
          },
        },
        {
          $addFields: {
            todoCount: {
              $size: "$result",
            },
          },
        },
        {
          $project: {
            password: 0,
            result: 0,
            __v: 0,
          },
        },
      ])

      return res.status(200).json({ result, count: totalCount })
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id
      const userDetails = await UserModel.findOne({ _id: id })
      const public_id = userDetails?.avatar?.public_id || ""
      await deleteOldFilesOnCloudinary(public_id)
      await UserModel.findByIdAndDelete(id)
      return res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params?.id
      const result = await UserModel.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      )
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  },
  updateUserAvtar: async (req, res) => {
    try {
      const id = req.user?._id
      const oldPublic_id = req?.user?.avatar?.public_id
      const { url, public_id } = await renameFileWithExtension(
        req.file,
        oldPublic_id
      )

      const updateUserDetaile = await UserModel.findByIdAndUpdate(
        id,
        {
          avatar: {
            url,
            public_id,
          },
        },

        {
          new: true,
        }
      ).select("avatar")
      return res.status(200).json(updateUserDetaile)
    } catch (error) {
      res
        .status(500)
        .json({ message: error?.message || "Something went wrong" })
    }
  },
}

module.exports = UserController
