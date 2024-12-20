import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Navbar from "./Navbar";
import InputPosts from "./InputPosts";
import Posts from "./Posts";
import ScreenShot from "../assets/ss.png";
import ScreenShot2 from "../assets/ss2.png";
import AuthImg from "../assets/auth.jpg";
import "../css/Posts.css";

const MainPage = () => {
  const [selectedPost, setSelectedPost] = useState(null); // State to hold the selected post
  const [myUsername, setMyUsername] = useState("");
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const recommendedUsers = [
    { id: 1, username: "john_doe92", followers: "510", pfp: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, username: "jane_smith45", followers: "350", pfp: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, username: "samuel_taylor", followers: "800", pfp: "https://randomuser.me/api/portraits/men/3.jpg" },
];




  const trendingTopics = [
    {
      category: "TRENDING IN INDONESIA",
      topics: [
        { hashtag: "#Minions", posts: "97.7k" },
        { hashtag: "#SeninBarokah", posts: "87.2k" }
      ]
    },
    {
      category: "NFT",
      topics: [
        { hashtag: "#Texos", posts: "122.7k" }
      ]
    },
    {
      category: "FOOTBALL",
      topics: [
        { hashtag: "#MUFC", posts: "97.2k" },
        { hashtag: "#Rangnick", posts: "77.2k" },
        { hashtag: "#ThxOle", posts: "54.2k" }
      ]
    }
  ];

  const navigate = useNavigate();  // Initialize useNavigate

  const handlePostClick = (postId) => {
    alert('clicked on a post' + postId);

    navigate(`/openpost/${postId}`);  // Redirect to the post's page
  };

  const handleEditPost = async (postIndex, postId) => {
    const newCaption = prompt("Edit your post content:");

    if (newCaption) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editpost/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ caption: newCaption }),
        });

        if (!response.ok) {
          throw new Error("Failed to update the post.");
        }

        const updatedPost = await response.json();

        setPosts((prevPosts) =>
          prevPosts.map((post, index) =>
            index === postIndex ? { ...post, caption: updatedPost.caption } : post
          )
        );

        alert("Post updated successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error updating the post:", error);
        alert("An error occurred while editing the post. Please try again.");
      }
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deletepost/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post deleted successfully');
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
    }
  };

  useEffect(() => {
    const my_user_name = localStorage.getItem("username");
    setMyUsername(my_user_name);

    // Fetch posts from the backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/readpost`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[90rem] flex gap-4">
          {/* Left Section (Profile and Recommended Users) */}
          <div className="w-1/4 h-full flex flex-col min-h-[90vh] gap-4">
            {/* Left Top - Profile Section */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-between">
              <div className="w-24 h-24 mb-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">@{myUsername}</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex justify-around w-full mb-6">
                <div className="text-center px-4 py-2">
                  <p className="text-2xl font-bold text-gray-800">120</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="text-center px-4 py-2">
                  <p className="text-2xl font-bold text-gray-800">1.2K</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center px-4 py-2">
                  <p className="text-2xl font-bold text-gray-800">300</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
              <a href="#" className="text-blue-500 font-semibold">My Profile</a>
            </div>

            {/* Left Bottom - Recommended Users Section */}
            <div className="flex-1 bg-white rounded-lg p-4 max-h-[18rem]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">Recommended Users</h3>
              {recommendedUsers.map(user => (
                <div key={user.id} className="flex items-center text-left justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.pfp}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-left text-gray-800">{user.username}</h4>
                      <p className="text-sm text-gray-500">{user.followers} Followers</p>
                    </div>
                  </div>
                  <button className="bg-blue-700 text-sm font-medium text-white px-4 py-2 rounded-3xl hover:bg-blue-800">
                    Follow
                  </button>
                </div>
              ))}
              <a href="#" className="text-blue-500 font-semibold text-left">Show More</a>
            </div>
          </div>

          {/* Middle Section (Feed or Single Post) */}
          <div className="w-full h-[90vh] min-h-[90vh] max-h-[90vh] flex flex-col justify-start items-center mx-auto gap-4 overflow-y-auto scrollbar-hidden">
            {selectedPost ? (
              // Render the selected post when clicked
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4 items-center mb-4">
                  <img src={selectedPost.pfp} alt="Profile" className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="text-lg font-semibold">{selectedPost.username}</h3>
                    <p className="text-sm text-gray-500">{selectedPost.time}</p>
                  </div>
                </div>
                <p className="text-xl text-gray-800 mb-4">{selectedPost.text}</p>
                {selectedPost.image && <img src={selectedPost.image} alt="Post" className="w-full h-auto mb-4 rounded-lg" />}

                {/* Comments Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Comments</h4>
                  {selectedPost.comments.map((comment, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex items-center gap-4">
                        <img src={comment.pfp} alt="Profile" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-semibold">{comment.username}</p>
                          <p className="text-gray-600">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // If no post is selected, show the feed
              <>
                <InputPosts />
                {posts.map((post, index) => (
                  <Posts
                    key={post.username + post.text}
                    pfp={post.pfp}
                    username={post.username}
                    text={post.text}
                    image={post.image}
                    isLiked={post.isLiked} // Pass the actual isLiked state for each post
                    myUsername={post.username}
                    onEdit={() => handleEditPost(index, post._id)}
                    onDelete={() => handleDeletePost(post._id)}
                    postId={post._id} // Pass postId for the like functionality
                    onLike={(postId, liked) => {
                      // Handle like/unlike in the parent component
                      // You can update the state here to reflect the like/unlike change for the given post
                      console.log(postId, liked); // Example: Handle the post state change in the parent component
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="w-1/4 h-full max-h-[82rem] bg-white rounded-lg py-4 px-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Trend for you</h3>
            </div>
            {trendingTopics.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="text-sm font-semibold text-left text-gray-500 mb-2">{section.category}</h4>
                {section.topics.map((topic, index) => (
                  <div key={index} className="mb-5">
                    <p className="te font-bold text-left">{topic.hashtag}</p>
                    <p className="text-gray-500 text-left">{topic.posts}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
