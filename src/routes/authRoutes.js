const express = require("express");
const {
  login,
  register,
  registerAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register-admin", registerAdmin);

router.post("/login", login);
router.post("/register", register);

module.exports = router;
