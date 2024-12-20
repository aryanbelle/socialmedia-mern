import express from 'express';
import Post from '../models/post.js';  // Import the Post model
import User from '../models/user.js';  // Import the User model for checking user validity

const router = express.Router();

// Route to create a new post
router.post('/', async (req, res) => {
  try {
    // Extract the necessary fields from the request body
    const { caption, image } = req.body;

    // Check if the caption is provided
    if (!caption) {
      return res.status(400).json({
        status: 'error',
        message: 'Caption is required.',
      });
    }

    // Get the email from the request (assuming it is sent from frontend or JWT)
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required.',
      });
    }

    // Find the user by email who is creating the post
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    // Create a new post
    const newPost = new Post({
      username: user.username,
      pfp: user.profilePicture, // Get the profile picture of the user
      caption, // Caption provided by the user
      image: image || null, // Optional image
      likes: 0, // Initialize likes to 0
      comments: [], // Initialize comments as an empty array
      postedBy: user._id, // User who posted the content (using user._id)
    });

    // Save the new post
    await newPost.save();

    // Return a success response
    return res.status(201).json({
      status: 'success',
      message: 'Post created successfully.',
      data: newPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create the post.',
    });
  }
});

export default router;
