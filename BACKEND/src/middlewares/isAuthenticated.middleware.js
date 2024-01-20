const logger = require("../config/logger.config.js");

module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  logger.error("Unauthorized access attempt");
  res.status(401).redirect("/auth/login");
};
