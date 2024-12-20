import mongoose from 'mongoose';

// Define the Comment Schema
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    pfp: {
      type: String,  // URL to profile picture
      required: true,
    },
  },
  { timestamps: true } // To store when comments were created
);

// Define the Post Schema
const postSchema = new mongoose.Schema(
  {
    pfp: {
      type: String, // URL of the profile picture of the user who created the post
    //   required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL to the post's image (optional)
      default: null,
    },
    likes: {
      type: [String], // Array of strings (user IDs)
      default: [],    // Default is an empty array
    },
    comments: [commentSchema], // Array of comment objects
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (ID of the user who posted)
    //   required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Post model based on the schema
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
