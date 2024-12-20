import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaRegShareSquare, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Posts = ({ pfp, username, text, image, isLiked, myUsername, onEdit, onDelete, postId, onLike, initialLikes }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes); // Add initial likes state
  const [uName, setUName] = useState("");
  const navigate = useNavigate();

  const openPost = (postId) => {
    navigate(`/readpost/${postId}`);
  };

  const handleLike = async () => {
    try {
      const newLikedState = !liked;
      setLiked(newLikedState); // Toggle the like state

      const userId = localStorage.getItem("myusername"); // Replace with the actual user ID logic

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likepost/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, liked: newLikedState }),
      });

      if (!response.ok) {
        throw new Error("Failed to like/unlike the post");
      }

      const data = await response.json();

      // Update likes count after the server response
      setLikes(data.likes);

      // Store the new liked state in localStorage
      localStorage.setItem(`liked-${postId}`, newLikedState.toString());

      // Notify parent component about the like state change
      onLike(postId, newLikedState);
    } catch (error) {
      console.error("Error liking the post", error);
      setLiked(liked); // Revert the like state in case of an error
    }
  };

  useEffect(() => {
    // Retrieve the like state from localStorage on component mount
    const savedLikedState = localStorage.getItem(`liked-${postId}`) === "true";
    setLiked(savedLikedState);

    setUName(localStorage.getItem("myusername"));

    // If the like state is saved, update the likes count accordingly (optional)
    const savedLikes = localStorage.getItem(`likes-${postId}`);
    if (savedLikes) {
      setLikes(parseInt(savedLikes, 10));
    }
  }, [postId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6 w-full mx-auto border border-gray-200">
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={pfp}
            className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-300"
          />
          <p className="text-gray-800 font-semibold text-lg">{username}</p>
        </div>
        {/* Edit/Delete Buttons */}
        {username === uName && (
          <div className="flex gap-3">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={onEdit}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={onDelete}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Text Content */}
      <p className="text-gray-700 text-base text-left leading-6 mb-4">{text}</p>

      {/* Image (if uploaded) */}
      {image && <img src={image} alt="Post content" className="w-full h-auto mb-4 rounded-lg" />}

      {/* Actions: Like, Comment, Share, and Go to Post */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            className={`text-lg ${liked ? "text-red-500" : "text-gray-500"}`}
            onClick={handleLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Comments and Share Buttons (Optional) */}
          <FaRegComment className="text-gray-500 cursor-pointer" />
          <FaRegShareSquare className="text-gray-500 cursor-pointer" />
        </div>

        {/* Go to Post Button */}
        <button
          onClick={() => openPost(postId)}
          className="border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-200 hover:text-blue-900 px-6 py-2 text-sm rounded-full"
        >
          Go to post
        </button>
      </div>
    </div>
  );
};

export default Posts;
