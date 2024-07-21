//checking-middleware-status.js
module.exports = function (req, res, next) {
  console.log("it passes from middleware");
  req.randomNumber = Math.random();
  next(); //Make sure to add next then only it will move to the homeController
};
