const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
} = require("../controllers/auth-controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/profile", profileUser);

module.exports = router;
