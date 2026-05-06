const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const { createProjectSchema } = require("../validations/projectValidation");

// Admin creates a project
router.post("/", protect, authorizeRoles("Admin"), validate(createProjectSchema), createProject);

// Everyone can view projects (needed so we can assign tasks to them later!)
router.get("/", protect, getProjects);

module.exports = router;