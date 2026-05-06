const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getMyTasks,
  deleteTask
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// IMPORT our new validation tools
const validate = require("../middleware/validate");
const { createTaskSchema, updateStatusSchema } = require("../validations/taskValidation");

// Admin creates task (Now protected by Zod Validation!)
router.post("/", protect, authorizeRoles("Admin"), validate(createTaskSchema), createTask);

// Get all tasks
router.get("/", protect, getTasks);

// Member gets own tasks
router.get("/my", protect, authorizeRoles("Member"), getMyTasks);

// Update task status (Now protected by Zod Validation!)
router.patch("/:id", protect, authorizeRoles("Member"), validate(updateStatusSchema), updateTaskStatus);

// Delete task
router.delete("/:id", protect, authorizeRoles("Admin"), deleteTask);

module.exports = router;
