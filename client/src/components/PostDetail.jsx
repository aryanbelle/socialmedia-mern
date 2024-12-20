import React, { useState, useEffect } from "react";
import { FaHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from URL
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch post and comments on component load
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/readpost/${postId}`);
        const postData = await postResponse.json();

        if (postResponse.ok) {
          setPost({
            userProfilePicture: postData.pfp,
            username: postData.username,
            content: postData.text,
            image: postData.image,
          });
          setLikes(postData.likes || 0);
        } else {
          console.error("Error fetching post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/viewcomment/${postId}`);
        const commentsData = await commentsResponse.json();

        if (commentsResponse.ok) {
          setComments(commentsData || []);
        } else {
          console.error("Error fetching comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostData();
    fetchComments();
    
    // Read the liked state from localStorage
    const likedState = localStorage.getItem(`liked-${postId}`) === "true";
    setLiked(likedState);

  }, [postId]);

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes((prevLikes) => (newLikedState ? prevLikes + 1 : prevLikes - 1));
    
    // Store the new liked state in localStorage
    localStorage.setItem(`liked-${postId}`, newLikedState.toString());
  };

  const handleAddComment = async () => {
    if (commentText.trim()) {
      const username = localStorage.getItem('username') || "Anonymous";  // Get username from localStorage or fallback to "Anonymous"

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addcomment/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,  // Use the dynamic username
            comment: commentText,
            pfp: "https://via.placeholder.com/50",  // You can dynamically fetch this as well if needed
          }),
        });

        if (response.ok) {
          setCommentText("");
          // Fetch updated comments
          const updatedComments = await fetch(`${process.env.REACT_APP_BACKEND_URL}/viewcomment/${postId}`);
          const data = await updatedComments.json();
          setComments(data || []);
        } else {
          console.error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <img
          src={post.userProfilePicture}
          alt={post.username}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800">{post.username}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-900 text-xl text-left mb-4">{post.content}</p>
        {post.image && (
          <div className="flex justify-center items-center">
            <img
              src={post.image}
              alt="Post"
              className="rounded-lg border border-gray-300"
              style={{
                maxWidth: "600px",
                maxHeight: "300px",
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>

      <div className="flex space-x-6 mb-6">
        <button
          className="flex items-center space-x-2 text-gray-600 cursor-pointer focus:outline-none"
          onClick={handleLike}
        >
          <FaHeart className={liked ? "text-red-600" : "text-gray-600"} />
        </button>
        <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
          <FaRegComment />
        </div>
        <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
          <FaRegShareSquare />
          <p>Share</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://via.placeholder.com/50"
          alt="Your Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-700 hover:bg-blue-800 px-4 py-2 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img
              src={comment.pfp}
              alt={comment.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-left text-gray-800">{comment.username}</p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PostDetail;
