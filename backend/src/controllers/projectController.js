const projectService = require("../services/projectService");
const asyncHandler = require("../utils/asyncHandler");

// @desc   Create a new project
// @route  POST /api/projects
// @access Admin
const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user.id);
  res.status(201).json({ message: "Project created successfully", project });
});

// @desc   Get all projects
// @route  GET /api/projects
// @access Protected (All logged-in users)
const getProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.json(projects);
});

module.exports = {
  createProject,
  getProjects,
};