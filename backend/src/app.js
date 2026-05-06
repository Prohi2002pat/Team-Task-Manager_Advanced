// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");

// const { protect } = require("./middleware/authMiddleware");

// const { authorizeRoles } = require("./middleware/roleMiddleware");

// const taskRoutes = require("./routes/taskRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.use("/api/tasks", taskRoutes);

// app.get(
//   "/api/admin",
//   protect,
//   authorizeRoles("Admin"),
//   (req, res) => {
//     res.json({
//       message: "Admin access granted",
//       user: req.user,
//     });
//   }
// );

// module.exports = app;


const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { protect } = require("./middleware/authMiddleware");
const { authorizeRoles } = require("./middleware/roleMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. Rate Limiting (Limit each IP to 100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter); 

// 3. Body Parsers & CORS
app.use(cors({ origin: "*" })); // Moved CORS configuration entirely to app.js
app.use(express.json());

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// Test Admin Route
app.get("/api/admin", protect, authorizeRoles("Admin"), (req, res) => {
  res.json({
    message: "Admin access granted",
    user: req.user,
  });
});

// 5. Global Error Handler (MUST BE LAST)
app.use(errorHandler);

module.exports = app;