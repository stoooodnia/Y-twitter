const express = require("express");
const router = express.Router();
const {
  changeDescription,
  followUser,
} = require("../controllers/user.controller.js");

// change description
router.patch("/change-description", changeDescription);

// create follow relationship
router.post("/follow-user", followUser);
module.exports = router;
