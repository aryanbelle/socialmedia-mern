import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa"; // Close icon

const CommentModal = ({ isOpen, onClose, onSubmit, pfp, username, postText }) => {
    const [comment, setComment] = useState("");
    const textareaRef = useRef(null);

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment(""); // Clear the input
            onClose(); // Close the modal
        }
    };

    // Auto-resize the textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
        }
    }, [comment]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div
                className={`bg-white p-8 rounded-2xl w-[600px] relative shadow-lg overflow-hidden ${
                    isOpen ? "modal-open" : ""
                }`}
            >
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add a Comment</h2>

                {/* Post Information */}
                <div className="flex items-start mb-6 border-b pb-4">
                    {/* Post Author's Profile Picture */}
                    <img
                        src={pfp}
                        alt={`${username}'s profile`}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div className="flex flex-col">
                        <p className="text-gray-800 font-semibold text-left text-lg">{username}</p>
                        <p className="text-gray-600 text-sm text-left">{postText}</p>
                    </div>
                </div>

                {/* User's Comment Section */}
                <div className="flex items-start mb-6">
                    {/* User's Profile Picture */}
                    <img
                        src={pfp}
                        alt="Your profile"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    {/* Comment Input (Textarea) */}
                    <textarea
                        ref={textareaRef}
                        value={comment}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                        placeholder="Write your comment here..."
                        style={{
                            minHeight: "100px", // Minimum height for 1 row
                            paddingTop: "8px", // Padding to prevent overlap
                            paddingBottom: "8px", // Padding to prevent overlap
                            height: "auto", // Adjust height dynamically
                            maxHeight: "250px", // Maximum height for textarea (expandable)
                            overflowY: "auto", // Enable scrolling if content exceeds maxHeight
                        }}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors hover:bg-blue-800"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
