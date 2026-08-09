import React, { useEffect, useState } from "react";
import axios from "axios";

const MyArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
      fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/article/my-articles`,
            {
                withCredentials: true,
            }
          );

          setArticles(res.data.articles);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
    };

    const handleDelete = async (articleId) => {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/article/delete/${articleId}`,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      fetchArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Articles</h1>
        <p className="mt-2 text-gray-500">
          Manage all your published articles here.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Articles Found
          </h2>

          <p className="mt-2 text-gray-500">
            Start by creating your first article.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article._id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {article.summary}
            </p>

            <div className="mt-4 flex gap-3 text-sm text-gray-500">
              <span>{article.category}</span>
              <span>•</span>
              <span>
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  window.location.href = `/dashboard?tab=create-post&edit=${article._id}`;
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(article._id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default MyArticles;