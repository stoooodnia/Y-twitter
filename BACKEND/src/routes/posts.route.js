const express = require("express");
const router = express.Router();
const {
  addPost,
  getPostsByUserId,
} = require("../controllers/post.controller.js");

// router "/post"

// POST endpoint for creating a post
router.post("/add", addPost);

router.get("/user/:userId", getPostsByUserId);

module.exports = router;
