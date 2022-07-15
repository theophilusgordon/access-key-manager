const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  updateUserPassword,
  getOTP,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/otp", getOTP);
router.patch("/reset", updateUserPassword);

module.exports = router;
