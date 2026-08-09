import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/article`
      );

      setArticles(res.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Latest News
        </h1>

        <p className="mt-2 text-gray-500">
          Stay updated with the latest articles from KhabarSetu.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          No Articles Found
        </div>
      ) : (
        <div className="space-y-5">
          {articles.map((article) => (
            <div
              key={article._id}
              onClick={() => navigate(`/article/${article._id}`)}
              className="cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-lg"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="mb-4 h-60 w-full rounded-lg object-cover"
              />

              <h2 className="text-2xl font-bold">
                {article.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {article.summary}
              </p>

              <div className="mt-4 flex gap-3 text-sm text-gray-500">
                <span>{article.category}</span>

                <span>•</span>

                <span>{article.author.username}</span>

                <span>•</span>

                <span>
                  {new Date(
                    article.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsArticles;