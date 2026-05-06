const Project = require("../models/Project");

const createProject = async (projectData, adminId) => {
  const project = await Project.create({
    ...projectData,
    createdBy: adminId,
  });
  return project;
};

const getAllProjects = async () => {
  // Populating the creator so the frontend knows who made it
  return await Project.find().populate("createdBy", "name email");
};

module.exports = {
  createProject,
  getAllProjects,
};