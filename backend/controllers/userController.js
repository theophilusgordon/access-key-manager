const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");

// @desc: Register New User
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc: Authenticate A User
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc: Get A User
// @route: GET /api/users/user
// @access: Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
});

// @desc: Get OTP
// @route: GET /api/users/otp
// @access: Public
const getOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required to get OTP");
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error("Invalid user email");
  }

  // Generate OTP
  function generateOTP() {
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const userOTP = generateOTP();

  const otp = await OTP.create({
    otpKey: userOTP,
    author: {
      email,
    },
  });

  if (otp) {
    res.status(201).json({
      _id: otp.id,
      author: email,
    });
  } else {
    res.status(500);
    throw new Error("OTP could not be generated. Please try again");
  }

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MICRO_EMAIL,
      pass: process.env.MICRO_PASS,
    },
  });

  const mailOptions = {
    from: "acm.microfocus@hotmail.com",
    to: email,
    subject: "Access Key Manager Password Change",
    text: `Use the OTP provided in this email to reset your password on Access Key Manager.

    OTP: ${userOTP}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400);
      throw new Error("OTP could not be sent to email. Please try again");
    } else {
      res.status(200).send(`Email sent: ${info.response}`);
    }
  });
});

// @desc: Reset User Password
// @route: PATCH /api/users/user
// @access: Public
const updateUserPassword = asyncHandler(async (req, res) => {
  const { otp, password, email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide email one more time to change password");
  }

  if (!otp) {
    res.status(400);
    throw new Error("Please provide OTP sent to your email to change password");
  }

  const userOTP = await OTP.find({ "author.email": email });
  const otpKey = userOTP[userOTP.length - 1].otpKey;

  if (otp !== otpKey) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please provide a new password to update old password");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Change Password
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    {
      password: hashedPassword,
    },
    { new: true }
  );

  if (user) {
    res.status(201).json({
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data to reset password");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUserPassword,
  getOTP,
};
