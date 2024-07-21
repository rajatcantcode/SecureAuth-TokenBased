const express = require("express");
const router = express.Router();
const { protected } = require("../middleware/isLoggedIn.middleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
} = require("../controllers/auth-controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/profile", protected, profileUser);

module.exports = router;
