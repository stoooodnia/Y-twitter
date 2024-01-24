const express = require("express");
const router = express.Router();
const {
  changeProfile,
  followUser,
} = require("../controllers/user.controller.js");

// change description

router.put("/update-profile", changeProfile);

// create follow relationship
router.post("/follow-user", followUser);
module.exports = router;
