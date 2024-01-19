const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginAuthenticate,
  logout,
} = require("../controllers/auth.controller.js");

// register new user
router.post("/register", registerUser);

// login user
router.post("/login", loginAuthenticate);

// logout user
router.post("/logout", logout);

module.exports = router;
