const jwt = require("jsonwebtoken");

// Ensure you are using the environment variable for the secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateJwtToken = (data) => {
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not defined in environment variables");
  }
  // Sign method generates the token using the secret key
  return jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "8h" });
};

module.exports = generateJwtToken;
