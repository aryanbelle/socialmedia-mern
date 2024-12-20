import express from "express";
import sendVerificationMail from "../utils/sendVerificationMail.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Token from "../models/token.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Check if an OTP exists for the user that hasn't expired
    const existingToken = await Token.findOne({ user: newUser._id, expiresAt: { $gt: Date.now() } });
    if (existingToken) {
      return res.status(400).json({ message: "An OTP is already sent. Please wait before requesting a new one." });
    }

    // Generate OTP and create a token document
    const OTP = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    const token = new Token({
      user: newUser._id, // Reference to the user
      OTP: OTP + "", // Ensure the key matches the schema (case-sensitive)
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // Set expiry time for 2 minutes from now
    });

    // Save user and token
    await newUser.save();
    await token.save();

    // Send verification mail
    try {
      await sendVerificationMail(
        email,
        "Verification Mail of social media app",
        OTP
      );
    } catch (error) {
      return res.status(400).json({ message: "Unable to send verification mail!" });
    }

    res.status(201).json({
      message: "User registered successfully. A verification mail has been sent.",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default Router;
