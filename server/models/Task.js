const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  assignedTo: {
    type: String
  },

  status: {
    type: String,
    enum: [
      "Pending",
      "In Progress",
      "Completed",
      "Overdue"
    ],
    default: "Pending"
  },

  dueDate: {
    type: String
  }

}, {
  timestamps: true
});

module.exports =
  mongoose.model("Task", taskSchema);