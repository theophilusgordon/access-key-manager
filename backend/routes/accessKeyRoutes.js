const express = require("express");
const router = express.Router();
const {
  getAllAccessKeys,
  revokeAccessKey,
  userAccessKeys,
  createAccessKey,
  getUserAccessKey,
} = require("../controllers/accessKeyController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

router.post("/create", protect, createAccessKey);
router.get("/user", protect, userAccessKeys);
router.patch("/:id", [protect, adminProtect], revokeAccessKey);
router.get("/admin", [protect, adminProtect], getAllAccessKeys);
router.get("/:id", [protect, adminProtect], getUserAccessKey);

module.exports = router;
