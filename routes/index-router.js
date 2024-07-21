//index-router.js
const express = require("express");
const router = express.Router();

const { homeController } = require("../controllers/index-controller");
const checkMiddleware = require("../middleware/checking-middleware-status");

router.get("/", checkMiddleware, homeController);

module.exports = router;
