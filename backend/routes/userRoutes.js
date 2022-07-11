const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUser,
  updateUserPassword,
  getOTP,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
// router.post("/user", protect, getUser);
router.post("/otp", getOTP);
router.patch("/reset", updateUserPassword);

module.exports = router;
