const mongoose = require("mongoose")

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
    trim: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  dueDateTime: {
    type: Date,
    default: Date.now,
  },
})
TodosSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})
module.exports = mongoose.model("todos", TodosSchema)
