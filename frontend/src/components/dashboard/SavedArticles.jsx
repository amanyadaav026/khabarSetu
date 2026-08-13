import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedArticles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/saved`,
        {
          withCredentials: true,
        }
      );

      setSavedArticles(res.data.savedArticles);
    } catch (error) {
      console.error("Error fetching saved articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading saved articles...
      </div>
    );
  }

  if (savedArticles.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No saved articles yet.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Articles</h1>

      <div className="space-y-4">
        {savedArticles.map((article) => (
          <div
            key={article._id}
            className="border rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {article.summary}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {article.category}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
       ))}
    </div>
  </div>
);
};

export default SavedArticles