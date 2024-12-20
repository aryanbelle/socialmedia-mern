import express from "express";
import Post from "../models/post.js";

const router = express.Router();

// Route to like or unlike a post
router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, liked } = req.body;  // Ensure 'liked' is part of the body as well

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const userAlreadyLiked = post.likes.includes(userId);

    if (liked && !userAlreadyLiked) {
      // Add the user to the likes array if not liked already
      post.likes.push(userId);
    } else if (!liked && userAlreadyLiked) {
      // Remove the user from the likes array if already liked
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      return res.status(400).json({ message: 'Action not needed' }); // No change if the state is already correct
    }

    // Save the updated post
    await post.save();

    return res.json({ message: 'Post liked/unliked successfully', likes: post.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
