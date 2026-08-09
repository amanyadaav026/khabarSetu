import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentSection from "../components/dashboard/CommentSection";

const SingleArticle = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/article/${articleId}`
      );

      setArticle(res.data.article);
    } catch (error) {
      console.log(error);
    }
  };

  if (!article) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="h-56 w-full rounded-xl object-cover sm:h-80 lg:h-96"
      />

      <h1 className="mt-4 text-3xl font-bold leading-tight sm:mt-6 sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-8">
        {article.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500 sm:gap-3 sm:text-sm">
        <span>{article.category}</span>

        <span>•</span>

        <span>{article.author.username}</span>

        <span>•</span>

        <span>
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-800 sm:mt-8 sm:text-lg sm:leading-8">
        {article.content}
      </div>

      <div className="mt-10 sm:mt-12">
        <CommentSection articleId={article._id} />
      </div>
    </div>
  );
};

export default SingleArticle;