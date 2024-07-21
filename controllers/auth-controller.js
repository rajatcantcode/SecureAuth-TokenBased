const userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateJwtToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await userSchema.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "You are already registered 😅 . Pls Login",
        user: user,
      });
    }

    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = await userSchema.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token for the user
    const token = generateJwtToken({ email });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // Cookie will expire in 8 hours
      httpOnly: true,
      secure: true, // Use secure flag if using HTTPS
    });

    res.status(200).json({
      message: "User registered successfully 🎉",
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, kindly register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate a token for the user
    const token = generateJwtToken({ email });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // Cookie will expire in 8 hours
      httpOnly: true,
      secure: true, // Use secure flag if using HTTPS
    });

    res.status(200).json({
      message: "User logged in successfully 🎉",
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully 🎉" });
};

module.exports.profileUser = (req, res) => {
  // req.user is available because of the protected middleware
  // Note that the password field is not sent
  res.status(200).json({ user: req.user });
};
