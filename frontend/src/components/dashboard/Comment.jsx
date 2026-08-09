import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Comment = ({ comment, fetchComments }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comment/delete/${comment._id}`,
        {
          withCredentials: true,
        }
      );

      await fetchComments();

      alert("Comment deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete comment.");
    }
  };

  return (
    <div className="mb-4 rounded-lg border p-4">
      <p className="font-semibold">{comment.userId.username}</p>

      <p className="text-sm text-gray-500 mb-2">
          {new Date(comment.createdAt).toLocaleDateString()}
     </p>

      <p>{comment.content}</p>

      {currentUser &&
        currentUser._id === comment.userId._id && (
          <button
            onClick={handleDelete}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        )}
    </div>
  );
};

export default Comment;