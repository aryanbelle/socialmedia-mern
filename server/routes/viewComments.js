import express from 'express';
import Post from '../models/post.js'; // Path to your Post model

const router = express.Router();

// Route to get comments of a specific post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the post by ID and populate the comments array
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the comments from the post
    return res.status(200).json(post.comments); // Send the comments array as a response
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
