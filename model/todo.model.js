const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    dueDateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
  {
    strictQuery: false,
  },
  {
    strictPopulate: false,
  }
)
TodoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

// module.exports = mongoose.model("todos", TodoSchema)
const ToDoModel = mongoose.model("ToDo", TodoSchema)

module.exports = ToDoModel
