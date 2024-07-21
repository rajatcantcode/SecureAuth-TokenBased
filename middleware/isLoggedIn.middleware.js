const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model");

module.exports.protected = async (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let user = await userSchema
      .findOne({ email: decoded.email })
      //   Dont send the password field
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
