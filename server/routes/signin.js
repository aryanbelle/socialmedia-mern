import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Route for signing in
router.post('/', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check if identifier and password are provided
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email and password are required.',
      });
    }

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password.' });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: 'User is not verified.' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return res.status(200).json({
      success: true,
      message: 'Sign-in successful.',
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
