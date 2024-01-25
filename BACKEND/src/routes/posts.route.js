const express = require("express");
const router = express.Router();
const {
  addPost,
  getPostsByUserId,
  fetchPosts,
  addReply,
  fetchReplies,
} = require("../controllers/post.controller.js");

// router "/post"

// POST endpoint for creating a post
router.post("/add", addPost);

// Get posts posted by a user
router.get("/user/:userId", getPostsByUserId);

// get posts from users that the user follows
router.get("/fetch/:userId", fetchPosts);

// add reply
router.post("/add-reply", addReply);

// get replies to a post
router.get("/fetch-replies/:postId", fetchReplies);

module.exports = router;
