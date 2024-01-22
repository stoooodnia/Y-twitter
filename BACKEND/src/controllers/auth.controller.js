const logger = require("../config/logger.config.js");
const { register } = require("../models/users.model.js");

// register post
const registerUser = async (req, res) => {
  logger.info("Registering user");
  try {
    // todo: add validation for req.body
    await register(req.body);
    res.status(201);
  } catch (err) {
    logger.error(`Error registering user: ${err}`);
    res.status(err.status).send({ error: err.message });
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
  logger.info("Loging out user");
  req.logout(function (err) {
    if (err) {
      logger.error(`Error logging out user: ${err}`);
      return next(err);
    }
    req.session.destroy(function (err) {
      if (!err) {
        res
          .status(200)
          .clearCookie("connect.sid", { path: "/" })
          .send({ status: "Success" });
      } else {
        logger.error(`Error destroying session: ${err}`);
        return next(err);
      }
    });
  });
};

// check if user is authenticated
const isAuthenticated = (req, res) => {
  logger.info("Checking session");
  const isAuthenticated = req.isAuthenticated();
  logger.warn(`Session active: ${isAuthenticated}`);
  res.status(200).send({ isAuthenticated });
};

module.exports = {
  registerUser,
  loginAuthenticate,
  logout,
  isAuthenticated,
};
