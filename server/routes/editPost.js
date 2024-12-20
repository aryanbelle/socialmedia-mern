// backend/routes/editPost.js
import express from 'express';
import Post from '../models/Post.js'; // Assuming the Post model is in 'models/Post.js'

const router = express.Router();

// Edit post route to update caption
router.put('/:id', async (req, res) => {
    const postId = req.params.id;  // Get the post ID from the URL
    const newCaption = req.body.caption; // Get the new caption from the request body

    try {
        // Find the post by ID and update the caption
        const updatedPost = await Post.findByIdAndUpdate(postId, { caption: newCaption }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Respond with the updated post
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
