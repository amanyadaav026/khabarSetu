import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Newspaper,
  Bookmark,
  Eye,
  UserCheck,
} from "lucide-react";

const DashboardHome = () => {
  const [statsData, setStatsData] = useState({
    totalArticles: 0,
    savedArticles: 0,
    totalViews: 0,
  });

  const stats = [
    {
      title: "Total Articles",
      value: statsData.totalArticles,
      icon: <Newspaper className="h-7 w-7 text-blue-600" />,
    },
    {
      title: "Saved Articles",
      value: statsData.savedArticles,
      icon: <Bookmark className="h-7 w-7 text-orange-500" />,
    },
    {
      title: "Total Views",
      value: statsData.totalViews,
      icon: <Eye className="h-7 w-7 text-green-600" />,
    },
    {
      title: "Profile Status",
      value: "Complete",
      icon: <UserCheck className="h-7 w-7 text-purple-600" />,
    },
  ];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/stats`,
          {
            withCredentials: true,
          }
        );

        setStatsData(response.data.stats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Here's an overview of your KhabarSetu dashboard.
          </p>
        </div>

        <div className="w-full rounded-xl border bg-white px-4 py-3 shadow-sm sm:w-auto sm:px-5 sm:py-3">
          <p className="text-sm text-gray-500">
            Keep publishing quality news 🚀
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-6 sm:hover:-translate-y-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition-all duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
              {item.icon}
            </div>

            <span className="mt-4 block text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {item.value}
            </span>

            <h3 className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500 sm:mt-5 sm:text-sm">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;