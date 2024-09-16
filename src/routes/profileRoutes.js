const express = require("express");
const {
  getProfiles,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", getProfiles);
router.put("/:id", updateProfile);

module.exports = router;
