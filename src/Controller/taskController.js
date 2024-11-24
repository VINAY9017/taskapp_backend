const taskModel = require("../Model/taskModel");

// get tasks and user_id finding by get task
exports.getTasks = async (request, response) => {
  try {
    const userId = request.query.user_id;
    let dbRes;
    let message;
    let statusText;

    if (userId) {
      dbRes = await taskModel.find({ user_id: userId }).sort({ dueDate: 1 });
      message = dbRes.length > 0 
        ? "User tasks retrieved successfully" 
        : "No tasks found for this user";
    } else {
      dbRes = await taskModel.find().sort({ dueDate: 1 });
      message = dbRes.length > 0 
        ? "All tasks retrieved successfully" 
        : "No tasks available in the system";
    }

    statusText = dbRes.length > 0 ? "success" : "no data";

    return response.status(200).json({
      status: statusText,
      message: message,
      count: dbRes.length,
      data: dbRes,
    });

  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({
      status: "failed",
      message: userId 
        ? "Failed to retrieve user tasks" 
        : "Failed to retrieve tasks",
      error: error.message
    });
  }
};

// signle get api
exports.getTaskById = async (request, response) => {
  try {
    const dbRes = await taskModel.findById(request.params.id);
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "Single get Task successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to get",
    });
  }
};

// add api 
exports.createTask = async (request, response) => {
  try {
    const body = request.body;
    const userId = request.user._id;
    
    // Remove any "priority" or "status"
    const priority = body.priority?.replace(/^priority\s+/i, '').toLowerCase();
    const status = body.status?.replace(/^status\s+/i, '').toLowerCase();
    
    const taskData = {
      user_id: userId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      priority: priority,
      status: status
    };

    // Validate required fields
    if (!taskData.title || !taskData.priority || !taskData.status) {
      return response.status(400).json({
        status: "failed",
        message: "Title, priority, and status are required fields",
      });
    }

    const dbRes = await taskModel.create(taskData);
    
    return response.status(201).json({
      status: "success",
      message: "Task added successfully",
      data: dbRes,
    });

  } catch (error) {
    // Check if error is due to missing user authentication
    if (!request.user) {
      return response.status(401).json({
        status: "failed",
        message: "User authentication required",
      });
    }

    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return response.status(400).json({
        status: "failed",
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle other errors
    return response.status(500).json({
      status: "failed",
      message: "Failed to add task",
      error: error.message,
    });
  }
};

// update api
exports.updateTask = async (request, response) => {
  try {
    const body = request.body;
    const taskData = {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      priority: body.priority,
      status: body.status,
    };
    const dbRes = await taskModel.findByIdAndUpdate(
      request.params.id,
      taskData
    );
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "update successfully",
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to update",
    });
  }
};

// delete api
exports.deleteTask = async (request, response) => {
  try {
    const dbRes = await taskModel.findByIdAndDelete(request.params.id);
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "delete successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to delete",
    });
  }
};
