// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Completed"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Task", taskSchema);

// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true, // Removes accidental white spaces
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true, // Speeds up queries finding tasks for a specific user
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Completed"],
//       default: "Pending",
//       index: true, // Speeds up filtering tasks by status
//     },
//     priority: {
//       type: String,
//       enum: ["Low", "Medium", "High"],
//       default: "Medium",
//     },
//     dueDate: {
//       type: Date,
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // ✅ NEW: Connect this task to a specific project
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
      index: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    // ✅ Ensure dueDate is here for our Overdue feature!
    dueDate: {
      type: Date,
      required: true, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);