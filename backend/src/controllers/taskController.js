// const Task = require("../models/Task");
// const User = require("../models/User");

// // @desc   Create a new task
// // @route  POST /api/tasks
// // @access Admin
// const createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo } = req.body;

//     // Validate assigned user exists
//     const user = await User.findById(assignedTo);
//     if (!user) {
//       return res.status(404).json({ message: "Assigned user not found" });
//     }

//     // Create task
//     const task = await Task.create({
//       title,
//       description,
//       assignedTo,
//       createdBy: req.user.id,
//     });

//     res.status(201).json({
//       message: "Task created successfully",
//       task,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc   Get all tasks
// // @route  GET /api/tasks
// // @access Protected
// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find()
//       .populate("assignedTo", "name email")
//       .populate("createdBy", "name email");

//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc   Update task status
// // @route  PATCH /api/tasks/:id
// // @access Member
// const updateTaskStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     // Check if logged-in user is assigned
//     if (task.assignedTo.toString() !== req.user.id) {
//       return res.status(403).json({
//         message: "You can only update your own tasks",
//       });
//     }

//     // Update status
//     task.status = status || task.status;

//     await task.save();

//     res.status(200).json({
//       message: "Task updated successfully",
//       task,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc   Get logged-in user's tasks
// // @route  GET /api/tasks/my
// // @access Member
// const getMyTasks = async (req, res) => {
//   try {
//     console.log("Logged user:", req.user);
    
//     const mongoose = require("mongoose");
    
//     const tasks = await Task.find({assignedTo: new mongoose.Types.ObjectId(req.user.id),})
//     .populate("assignedTo", "name email")
//     .populate("createdBy", "name email");

//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     await task.deleteOne();

//     res.json({ message: "Task deleted successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ EXPORT (IMPORTANT)
// module.exports = {
//   createTask,
//   getTasks,
//   updateTaskStatus,
//   getMyTasks,
//   deleteTask
// };

// const taskService = require("../services/taskService");
// const asyncHandler = require("../utils/asyncHandler");

// // @desc   Create a new task
// // @route  POST /api/tasks
// // @access Admin
// const createTask = asyncHandler(async (req, res) => {
//   // We pull 'project' out of the request body
//   const { title, description, assignedTo, project, dueDate, priority } = req.body;

//   const task = await taskService.createTask({
//     title,
//     description,
//     assignedTo,
//     project,
//     dueDate,
//     priority,
//     createdBy: req.user.id
//   });

//   res.status(201).json(task);
// });

// // @desc   Get all tasks
// // @route  GET /api/tasks
// // @access Protected
// const getTasks = asyncHandler(async (req, res) => {
//   const tasks = await taskService.getAllTasks();
//   res.json(tasks);
// });

// // @desc   Update task status
// // @route  PATCH /api/tasks/:id
// // @access Member
// const updateTaskStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const task = await taskService.updateTaskStatus(req.params.id, status, req.user.id);
  
//   res.status(200).json({ message: "Task updated successfully", task });
// });

// // @desc   Get logged-in user's tasks
// // @route  GET /api/tasks/my
// // @access Member
// const getMyTasks = asyncHandler(async (req, res) => {
//   const tasks = await taskService.getUserTasks(req.user.id);
//   res.json(tasks);
// });

// // @desc   Delete task
// // @route  DELETE /api/tasks/:id
// // @access Admin
// const deleteTask = asyncHandler(async (req, res) => {
//   await taskService.deleteTask(req.params.id);
//   res.json({ message: "Task deleted successfully" });
// });

// module.exports = {
//   createTask,
//   getTasks,
//   updateTaskStatus,
//   getMyTasks,
//   deleteTask
// };

const taskService = require("../services/taskService");
const asyncHandler = require("../utils/asyncHandler");

// @desc   Create a new task
// @route  POST /api/tasks
// @access Admin
const createTask = asyncHandler(async (req, res) => {
  // req.body contains all the validated data from Zod!
  const task = await taskService.createTask(req.body, req.user.id);
  res.status(201).json({ message: "Task created successfully", task });
});

// @desc   Get all tasks
// @route  GET /api/tasks
// @access Admin
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

// @desc   Get logged-in user's tasks
// @route  GET /api/tasks/my
// @access Member
const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getMyTasks(req.user.id);
  res.json(tasks);
});

// @desc   Update task status
// @route  PATCH /api/tasks/:id
// @access Admin/Member
const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
  res.json({ message: "Task updated", task });
});

// @desc   Delete a task
// @route  DELETE /api/tasks/:id
// @access Admin
const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = {
  createTask,
  getTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
};