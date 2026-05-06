const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

exports.signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);
  
  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  
  res.status(200).json({
    message: "Login successful",
    token,
    user,
  });
});
