const jwt = require("jsonwebtoken");
const generateJwtToken = (data) => {
  // sign method helps in generating the token sign(payload, secretKey)
  let token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = generateJwtToken;
