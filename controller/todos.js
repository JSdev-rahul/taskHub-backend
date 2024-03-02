const errorMiddleware = require("../middleware/errorMiddleware");
const todos = require("../model/todos");

const TodosCtrl = {
  createNewTodo: async (req, res) => {
    try {
      const result = await new todos(req.body).save();
      return res
        .status(201)
        .json({ result, message: "ToDo Created Successfuly" });
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  },
  getUserTodos: async (req, res) => {
    try {
      const { id } = req.params;
      const { completed, q, priority, page, limit } = req.query;

      // Construct the base query object with the user ID and completed status
      const query = { user: id, completed };

      // Add priority filter if provided in query parameters
      if (priority) {
        query.priority = priority;
      }

      // Add title search filter using regex if provided in query parameters
      if (q) {
        query.title = { $regex: q, $options: "i" }; // Case-insensitive search using regex
      }

      // Clone the query object for counting total documents
      const countQuery = { ...query };

      // Count the total number of documents matching the query criteria
      const totalCount = await todos.countDocuments(countQuery);

      // Find todos matching the query with pagination
      const result = await todos
        .find(query, { user: 0 })
        .skip(page * limit - limit)
        .limit(limit);

      // Return the paginated todos and total count in the response
      return res.status(200).json({ result, count: totalCount });
    } catch (error) {
      // Handle any errors and send an error response
      errorMiddleware(error, req, res);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await todos.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Todo deleted successfully", result });
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await todos.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ result, message: "ToDo update Successfully" });
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  },
};

module.exports = TodosCtrl;
