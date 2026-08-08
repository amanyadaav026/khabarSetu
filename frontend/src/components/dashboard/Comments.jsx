import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = () => {

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/comment/get-comments",
        {
          withCredentials: true,
        }
      );

      setComments(res.data);

    } catch(error){
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchComments();
  },[]);


  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Comments
      </h1>


      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (

        comments.map((comment)=>(
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


export default Comments;