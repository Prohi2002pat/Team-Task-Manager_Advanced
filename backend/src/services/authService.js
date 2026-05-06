const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signup = async (userData) => {
  const { name, email, password } = userData;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists"); // Caught by our global error handler
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "Member",
  });

  return user; // Our updated User model will automatically hide the password!
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id, user.role);

  return { user, token };
};

module.exports = { signup, login };