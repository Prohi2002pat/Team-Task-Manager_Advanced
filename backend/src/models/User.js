const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // We will handle hiding the password in the JSON transformation below
    },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },
    isActive: {
      type: Boolean,
      default: true, // Useful for "soft deleting" users without wiping their task history
    }
  }, 
  { timestamps: true }
);

// ENTERPRISE UPGRADE: Never return the password field in a JSON response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
