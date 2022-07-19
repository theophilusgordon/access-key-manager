const asyncHandler = require("express-async-handler");
const AccessKey = require("../models/accessKeyModel");
const User = require("../models/userModel");

// @desc: Create Access Key
// @route: POST /api/keys
// @access: Private
const createAccessKey = asyncHandler(async (req, res) => {
  const { number, ccv, holderName, expiry } = req.body;

  if (!number || !holderName || !ccv || !expiry) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Find active access key from the author
  const activeKey = await AccessKey.find({
    $and: [{ condition: "Active" }, { "author.email": req.user.email }],
  });
  // Deny access to purchase new access key if active key is found
  if (activeKey.length > 0) {
    res.status(400);
    throw new Error("User already has an active access key");
  }

  // Generate AccessKey
  function generateKey() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const key = generateKey();

  // Create Access Key
  const accessKey = await AccessKey.create({
    key,
    author: {
      _id: req.user.id,
      email: req.user.email,
    },
  });

  if (accessKey) {
    res.status(201).json({
      _id: accessKey.id,
      key,
      author: req.user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data to purchase access key");
  }
});

// @desc: Get Access Key For A User
// @route: GET /api/keys/user
// @access: Private
const userAccessKeys = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(400);
    throw new Error("Cannot get Access Keys for invalid user");
  }

  const keys = await AccessKey.find({ "author.email": req.user.email });
  res.status(200).json(keys);
});

// @desc: Get All Access Keys in DB with their associated info
// @route: GET /api/keys/key
// @access: Private
const getAllAccessKeys = asyncHandler(async (req, res) => {
  // Send all access keys to admin
  const accessKeys = await AccessKey.find();
  res.status(200).json(accessKeys);
});

// @desc: Get Access Key For An Email
// @route: GET /api/keys/:email
// @access: Private
const getUserAccessKey = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email to access Access Key");
  }

  const emailExists = await User.findOne({ "author.email": email });

  if (!emailExists) {
    res.status(400);
    throw new Error(
      "Please enter a valid email to access Access Key information"
    );
  }

  // Find active access key from the author
  const key = await AccessKey.find({
    $and: [{ condition: "Active" }, { "author.email": req.params.email }],
  });

  if (!key) {
    res.status(404);
    throw new Error("User has no active key");
  }

  res.status(200).json(key);
});

// @desc: Revoke User Access Key
// @route: PATCH /api/keys/:id
// @access: Private
const revokeAccessKey = asyncHandler(async (req, res) => {
  try {
    const modifyAccessKey = await AccessKey.findOneAndUpdate(
      { _id: req.params.id },
      {
        condition: req.body.revoke,
      },
      { new: true }
    );

    if (modifyAccessKey) {
      res.status(201).json(modifyAccessKey);
    }
  } catch (error) {
    res.status(400);
    throw new Error("Access Key could not be modified");
  }
});

module.exports = {
  createAccessKey,
  getUserAccessKey,
  userAccessKeys,
  revokeAccessKey,
  getAllAccessKeys,
};
