const Task = require("../models/Task");

const createTask = async (taskData, adminId) => {
  const task = await Task.create({
    ...taskData,
    createdBy: adminId,
  });
  return task;
};

const getAllTasks = async () => {
  // Populating assignedTo and project so the frontend can see their names
  return await Task.find()
    .populate("assignedTo", "name email")
    .populate("project", "title");
};

const getMyTasks = async (userId) => {
  return await Task.find({ assignedTo: userId }).populate("project", "title");
};

const updateTaskStatus = async (taskId, status) => {
  return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
};