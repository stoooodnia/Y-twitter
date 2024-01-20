const express = require("express");
const router = express.Router();
const { changeDescription } = require("../controllers/user.controller.js");

// change description
router.post("/change-description", changeDescription);

module.exports = router;
