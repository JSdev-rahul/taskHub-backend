const ToDoModel = require("../model/todo.model")

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

      const { completed, q, priority, page, limit } = req.query

      // Construct the base query object with the user ID and completed status
      const query = { user: id, completed }

      // Add priority filter if provided in query parameters
      if (priority) {
        query.priority = priority
      }

      // Add title search filter using regex if provided in query parameters
      if (q) {
        query.title = { $regex: q, $options: "i" } // Case-insensitive search using regex
      }

      // Clone the query object for counting total documents
      const countQuery = { ...query }

      // Count the total number of documents matching the query criteria
      const totalCount = await ToDoModel.countDocuments(countQuery)

      // Find todos matching the query with pagination
      const result = await ToDoModel.find(query, { user: 0 })
        .skip(page * limit - limit)
        .limit(limit)

      // Return the paginated todos and total count in the response
      return res.status(200).json({ result, count: totalCount })
    } catch (error) {
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
