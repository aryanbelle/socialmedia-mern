import express from 'express';
import Post from '../models/post.js';

const router = express.Router();

// Route to handle adding a comment
router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { comment, username, pfp } = req.body; // Data sent by the frontend

  if (!comment || !username || !pfp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the post by ID and add the new comment
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the new comment to the comments array
    post.comments.push({
      username,
      comment,
      pfp,
    });

    // Save the post with the new comment
    await post.save();

    return res.status(200).json(post); // Send back the updated post
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;