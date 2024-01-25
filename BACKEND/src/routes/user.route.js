const express = require("express");
const router = express.Router();
const {
  changeProfile,
  followUser,
  searchProfiles,
  unFollowUser,
  getUserById,
} = require("../controllers/user.controller.js");

// change description

router.put("/update-profile", changeProfile);

// create follow relationship
router.post("/follow", followUser);

// delete follow relationship
router.post("/unfollow", unFollowUser);

// get user by userId
router.get("/:userId", getUserById);

// search for profiles
router.get("/search/:searchQuery", searchProfiles);
router.get("/search-any", searchProfiles);
module.exports = router;
