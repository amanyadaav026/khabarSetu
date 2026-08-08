import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchPendingArticles();
  }, []);

  const fetchPendingArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/article/pending",
        {
          withCredentials: true,
        }
      );

      setArticles(res.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (articleId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/article/approve/${articleId}`,
        {},
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
      fetchPendingArticles();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleReject = async (articleId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/article/reject/${articleId}`,
        {},
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
      fetchPendingArticles();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Articles</h1>
        <p className="mt-2 text-gray-500">
          Review and approve submitted articles.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Pending Articles
          </h2>

          <p className="mt-2 text-gray-500">
            All submitted articles have been reviewed.
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
                <span>{article.author?.username}</span>
                <span>•</span>
                <span>
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleApprove(article._id)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(article._id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingArticles;