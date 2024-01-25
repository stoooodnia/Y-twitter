const express = require("express");
const router = express.Router();
const {
  changeProfile,
  followUser,
  searchProfiles,
  unFollowUser,
  getUserById,
  checkFollow,
} = require("../controllers/user.controller.js");

// change description

router.put("/update-profile", changeProfile);

// create follow relationship
router.post("/follow", followUser);

// delete follow relationship
router.post("/unfollow", unFollowUser);

// check if user is following another user
router.post("/check-follow", checkFollow);

// get user by userId
router.get("/:userId", getUserById);

// search for profiles
router.get("/search/:searchQuery", searchProfiles);
router.get("/search-any", searchProfiles);
module.exports = router;
