const logger = require("../config/logger.config.js");
const { register } = require("../models/users.model.js");

// register post
const registerUser = async (req, res) => {
  logger.info("Trying to register user");
  try {
    // todo: add validation for req.body
    await register(req.body);
    res.status(201).redirect("/auth/login");
  } catch (err) {
    logger.error(`Error registering user: ${err}`);
    res.status(err.status).redirect("/auth/register");
  }
};

// login post, authentication
const loginAuthenticate = (req, res) => {
  logger.info("Login user");
  res.status(200).send({
    userId: req.user.userId,
    username: req.user.username,
    email: req.user.email,
  });
};

// logout post
const logout = (req, res, next) => {
  logger.info("Trying to logout user");
  req.logout(function (err) {
    if (err) {
      logger.error(`Error logging out user: ${err}`);
      return next(err);
    }
    res.status(302).redirect("/auth/login");
  });
};

module.exports = {
  registerUser,
  loginAuthenticate,
  logout,
};
