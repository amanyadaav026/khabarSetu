import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Newspaper, Bookmark, TrendingUp } from "lucide-react";

const Analytics = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [totalArticles, setTotalArticles] = useState(0);
  const [savedArticles, setSavedArticles] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const [articlesRes, savedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/article/my-articles`, {
          withCredentials: true,
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/saved`, {
          withCredentials: true,
        }),
      ]);

      setTotalArticles(articlesRes.data.articles.length);
      setSavedArticles(savedRes.data.savedArticles.length);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Articles */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Articles
              </p>

              <h2 className="mt-3 text-5xl font-bold text-gray-900">
                {totalArticles}
              </h2>

              <p className="mt-3 text-sm text-green-600">
                Keep publishing quality news 🚀
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Newspaper className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Saved Articles */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Saved Articles
              </p>

              <h2 className="mt-3 text-5xl font-bold text-gray-900">
                {savedArticles}
              </h2>

              <p className="mt-3 text-sm text-blue-600">
                Your personal reading collection 📚
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Bookmark className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;