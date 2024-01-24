const express = require("express");
const router = express.Router();
const {
  changeProfile,
  followUser,
  searchProfiles,
} = require("../controllers/user.controller.js");

// change description

router.put("/update-profile", changeProfile);

// create follow relationship
router.post("/follow-user", followUser);

// search for profiles
router.get("/search/:searchQuery", searchProfiles);
router.get("/search", searchProfiles);
module.exports = router;
