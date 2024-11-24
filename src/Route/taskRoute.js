const express = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");
const authenticateUser = require("../Middleware/authMiddleware");

const taskRoute = express.Router();

// middleware proteted route
taskRoute.use(authenticateUser); 

taskRoute.post("/create", createTask);
taskRoute.get("/get", getTasks);
taskRoute.get("/get/:id", getTaskById);
taskRoute.put("/update/:id", updateTask);
taskRoute.delete("/delete/:id", deleteTask);

module.exports = taskRoute;
