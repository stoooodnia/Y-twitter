const express = require("express");
const router = express.Router();
const { addPost } = require("../controllers/post.controller.js");

// POST endpoint for creating a post
router.post("/add", addPost);

module.exports = router;
