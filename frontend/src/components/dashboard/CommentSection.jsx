import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/comment/get/${articleId}`
      );

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">
        Comments
      </h2>

      <CommentForm
        articleId={articleId}
        fetchComments={fetchComments}
      />

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet.
        </p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            fetchComments={fetchComments}
          />
        ))
      )}
    </div>
  );
};

export default CommentSection;