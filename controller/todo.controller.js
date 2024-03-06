const ToDoModel = require("../model/todo.model")
const mongoose = require("mongoose")

const TodoController = {
  createTodo: async (req, res) => {
    try {
      req.body.user = req?.user?._id
      const result = await new ToDoModel(req.body).save()
      return res
        .status(201)
        .json({ result, message: "ToDo Created Successfuly" })
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  },
  getUserTodo: async (req, res) => {
    try {
      const { id } = req.params

      const { completed, q, priority, page = 1, limit = 5 } = req.query

      const query = {
        user: new mongoose.Types.ObjectId(id),
        completed: completed == "true" ? true : false,
      }

      if (priority) {
        query.priority = priority
      }
      if (q) {
        query.title = { $regex: q, $options: "i" }
      }

      // ======= Get total Count  ========

      // const totalCount = await ToDoModel.countDocuments(query)

      //=============================================

      // ========= Normal Query =============

      // const result = await ToDoModel.aggregate([
      //   {
      //     $match: query,
      //   },
      //   {
      //     $skip: page * limit - limit,
      //   },
      //   {
      //     $limit: Number(limit),
      //   },
      // ])

      // ===============================

      //  ==========Nested query============

      const result = await ToDoModel.aggregate([
        {
          $facet: {
            document: [
              {
                $match: query,
              },
              {
                $limit: Number(limit),
              },
              {
                $skip: page * limit - limit,
              },
            ],
            totalCount: [{ $match: query }, { $count: "count" }],
          },
        },
        {
          $project: {
            document: 1,
            totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ])
      //===========================================

      // const res = await ToDoModel.find(query, { user: 0 }).limit(1)    // user 0 means user filed project ho jayegi
      // console.log("res", res)

      return res
        .status(200)
        .json({ result: result[0]?.document, count: result[0]?.totalCount })
    } catch (error) {
      console.log("er", error)
      // Handle any errors and send an error response
      res.status(500).json({ message: "something went wrong" })
    }
  },

  deleteTodoById: async (req, res) => {
    try {
      const { id } = req.params

      const todosDetails = await ToDoModel.findOne({ _id: id })

      // Check if the user making the request is authorized to delete the todo.
      // If the user ID in the request does not match the user ID associated with the todo,
      // throw an error with a 400 status code and a message indicating unauthorized access.

      if (!req.user?._id.equals(todosDetails?.user)) {
        return res
          .status(401)
          .json({ message: "not aithorized to delete the todo" })
      }
      const result = await ToDoModel.findByIdAndDelete(id)

      return res
        .status(200)
        .json({ message: "Todo deleted successfully", result })
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  },
  updateTodoById: async (req, res) => {
    try {
      const { id } = req.params

      const todosDetails = await ToDoModel.findOne({ _id: id })

      // Check if the user making the request is authorized to delete the todo.
      // If the user ID in the request does not match the user ID associated with the todo,
      // throw an error with a 400 status code and a message indicating unauthorized access.

      if (!req.user?._id.equals(todosDetails?.user)) {
        return res
          .status(401)
          .json({ message: "not aithorized to delete the todo" })
      }

      const result = await ToDoModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      )
      return res
        .status(200)
        .json({ result, message: "ToDo update Successfully" })
    } catch (error) {
      res.status(500).json({ message: error?.message })
    }
  },
}

module.exports = TodoController
