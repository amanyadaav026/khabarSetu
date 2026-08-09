import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ articleId, fetchComments }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comment/create`,
        {
          content,
          articleId,
        },
        {
          withCredentials: true,
        }
      );

      setContent("");
      await fetchComments();

      alert("Comment posted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to post comment.");
    }
  };

  return (
    <div className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;