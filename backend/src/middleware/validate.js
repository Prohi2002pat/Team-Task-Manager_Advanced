const validate = (schema) => (req, res, next) => {
  try {
    // If req.body is completely missing, default to an empty object
    schema.parse(req.body || {});
    next(); 
  } catch (error) {
    // Check if the error specifically came from Zod
    if (error.name === "ZodError") {
      const errors = error.issues.map((err) => ({
        field: err.path[0] || "input",
        message: err.message,
      }));
      return res.status(400).json({ message: "Validation Failed", errors });
    }
    
    // If it's a different kind of server error, pass it to our global errorHandler
    next(error);
  }
};

module.exports = validate;