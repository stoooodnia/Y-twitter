const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginAuthenticate,
  logout,
  isAuthenticated,
} = require("../controllers/auth.controller.js");

// router "/auth"

// register new user
router.post("/register", registerUser);

// login user
router.post("/login", loginAuthenticate);

// logout user
router.post("/logout", logout);

// check session
router.get("/is-auth", isAuthenticated);

module.exports = router;
