const bcrypt = require("bcrypt");
const passport = require("passport");
const logger = require("../config/logger.config.js");

// register post
const registerUser = async (req, res) => {
  try {
    const { password, ...other } = req.body;
    console.log(password, other);

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      password: hash,
      ...other,
      role: "user",
    });
    newUser.save();
    return res.status(302).redirect("/auth/login");
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

// login post, authentication
const loginAuthenticate = (req, res, next) => {
  logger.info("Trying to authenticate user");
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
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
