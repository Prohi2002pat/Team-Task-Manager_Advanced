const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  project: z.string().length(24, "Invalid Project ID format"),
  assignedTo: z.string().length(24, "Invalid User ID format"),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  dueDate: z.coerce.date({
    required_error: "Please select a due date",
    invalid_type_error: "That's not a valid date!",
  }),
});

const updateStatusSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Completed"], {
    errorMap: () => ({ message: "Status must be Pending, In Progress, or Completed" })
  }),
});

module.exports = {
  createTaskSchema,
  updateStatusSchema,
};