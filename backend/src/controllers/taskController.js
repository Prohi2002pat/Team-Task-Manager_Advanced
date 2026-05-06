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
