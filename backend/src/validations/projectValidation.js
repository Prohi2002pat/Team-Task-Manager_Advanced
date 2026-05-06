const { z } = require("zod");

const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
});

module.exports = { createProjectSchema };