const userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateJwtToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await userSchema.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "You are already registered 😅 . Pls Login" });
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

    // Now the user has been registered it's time to login the user automatically
    const token = generateJwtToken({ email });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      httpOnly: true,
      secure: true,
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

module.exports.loginUser = (req, res) => {
  res.send("Login User");
};

module.exports.logoutUser = (req, res) => {
  res.send("Logout User");
};

module.exports.profileUser = (req, res) => {
  res.send("Profile User");
};
