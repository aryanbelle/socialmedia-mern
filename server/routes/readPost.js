import express from "express";
import Post from "../models/post.js"; // Assuming the Post model file name is postModel.js

const router = express.Router();

// Route to retrieve all posts
router.get("/", async (req, res) => {
  try {
    // Fetch posts from the database and populate the `postedBy` field to get the `username`
    const posts = await Post.find({})
      .populate("postedBy", "username") // Populate username from User model
      .sort({ createdAt: -1 }); // Sort posts by most recent

    // Map posts to include only the required fields
    const formattedPosts = posts.map(post => ({
      _id: post._id,
      pfp: post.pfp,
      username: post.postedBy?.username || "Unknown User", // Fallback if user is missing
      text: post.caption,
      image: post.image,
      isLiked: false, // Placeholder, can be dynamic based on user-specific likes
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from the route parameter
    console.log(postId);
    // Fetch the post by ID and populate the `postedBy` field to get the `username`
    const post = await Post.findById(postId)
      .populate("postedBy", "username") // Populate username from User model
      .exec(); // Execute the query

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Format the post to include only the required fields
    const formattedPost = {
      _id: post._id,
      pfp: post.pfp,
      username: post.postedBy?.username || "Unknown User", // Fallback if user is missing
      text: post.caption,
      image: post.image,
      isLiked: false, // Placeholder, can be dynamic based on user-specific likes
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});


export default router;