import React, { useState, useRef } from "react";

const InputPosts = () => {
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setCaption(event.target.value);

    // Adjust textarea height dynamically
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handlePost = async () => {
    if (!caption.trim()) {
      alert("Caption cannot be empty!");
      return;
    }

    const email = localStorage.getItem("myemail");
    setIsLoading(true);

    try {
      // POST request to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({caption, email}), // Sending caption to the backend
      });

      if (response.ok) {
        // Success: Notify the user and reset the caption
        alert("Post uploaded successfully!");
        setCaption(""); // Clear input field
        window.location.reload();
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Network or server error
      alert("Failed to upload post. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white border-1 shadow rounded-lg px-4 pt-4 pb-6 h-auto flex flex-col gap-4 w-full">
      {/* Top Section: Profile Picture and Input */}
      <div className="flex items-start gap-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <textarea
          ref={textareaRef}
          value={caption}
          onChange={handleChange}
          placeholder="What's happening?"
          rows={1}
          className="flex-1 resize-none bg-opacity-50 rounded-md p-2 focus:outline-none text-gray-800 text-sm placeholder-gray-500"
          style={{
            minHeight: "40px",
            paddingTop: "8px",
            paddingBottom: "8px",
            height: "auto",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        />
      </div>

      {/* Bottom Section: Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-blue-500 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l-3.66-3.66a.5.5 0 00-.707 0l-3.66 3.66A2.121 2.121 0 005 7.646v8.708a2.121 2.121 0 002.121 2.121h9.758A2.121 2.121 0 0019 16.354V7.646a2.121 2.121 0 00-2.121-2.414H15.23z"
              />
            </svg>
            Photo
          </button>
          <button className="flex items-center gap-2 text-green-500 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553 2.276a1 1 0 010 1.448L15 16v-6zM10 6h1v12h-1a4 4 0 01-4-4V10a4 4 0 014-4z"
              />
            </svg>
            Video
          </button>
        </div>
        <button
          onClick={handlePost}
          disabled={isLoading}
          className={`flex items-center gap-2 text-white bg-blue-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-800 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default InputPosts;
