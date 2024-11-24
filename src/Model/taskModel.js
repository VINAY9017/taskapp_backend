const mongoose = require("mongoose");
const collection = require("../Config/Collection");

const taskSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    lowercase: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    lowercase: true
  }
},{
  timestamps:true
});

const taskModel = mongoose.model(collection.task, taskSchema);

module.exports = taskModel;
