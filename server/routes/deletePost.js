import express from 'express';
import Post from '../models/post.js';// Adjust path as needed

const router = express.Router();

// DELETE route to delete a post by its ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters

  try {
    // Find the post by ID and delete it
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;