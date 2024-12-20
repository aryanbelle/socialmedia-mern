import React, { useState } from "react";

const EditPostModal = ({ post, onSave, onClose }) => {
  const [newCaption, setNewCaption] = useState(post.caption);

  const handleSave = () => {
    if (newCaption) {
      onSave(post._id, newCaption);
      onClose(); // Close the modal after saving
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-md"
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
