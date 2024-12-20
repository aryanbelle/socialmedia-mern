import express from 'express';
import upload from "../config/multerConfig.js";
import cloudinary from '../config/cloudinary.js'; // Cloudinary config
import User from "../models/user.js";

const router = express.Router();

// Standard Response Format
const successResponse = (message, data = {}) => ({
  status: 'success',
  message,
  data,
});

const errorResponse = (message, errorCode = 400) => ({
  status: 'error',
  message,
  code: errorCode,
});

// Route for uploading profile picture
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded.'));
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pictures', // Folder name in Cloudinary
    });

    // Assuming the email is sent in the request body (e.g., from the frontend)
    const email = req.body.email;

    if (!email) {
      return res.status(400).json(errorResponse('Email is required.'));
    }

    // Find the user by email and update their profile picture
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(errorResponse('User not found.', 404));
    }

    // Update the user's profile picture with the URL from Cloudinary
    user.profilePicture = result.secure_url;

    // Save the updated user document
    await user.save();

    return res.status(200).json(successResponse('Profile picture uploaded and saved successfully', { imageUrl: result.secure_url }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse('Failed to upload and save profile picture', 500));
  }
});

export default router;
