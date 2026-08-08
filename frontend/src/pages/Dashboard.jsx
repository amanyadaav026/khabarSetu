import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNavBar from "@/components/dashboard/BottomNavBar";
import Profile from "@/components/dashboard/Profile";
import Settings from "../components/dashboard/Settings";

import DashboardHome from "../components/dashboard/DashboardHome";
import CreatePost from "../components/dashboard/CreatePost";
import MyArticles from "../components/dashboard/MyArticles";
import SavedArticles from "../components/dashboard/SavedArticles";
import Analytics from "../components/dashboard/Analytics";
import Users from "../components/dashboard/Users";
import Comments from "../components/dashboard/Comments";
import PendingArticles from "../components/dashboard/PendingArticles";

const Dashboard = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("dashboard");
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64 md:shrink-0">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <main className="min-w-0 flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-6 md:pb-6">
        {tab === "dashboard" && <DashboardHome />}

        {tab === "profile" && <Profile />}

        {tab === "create-post" && <CreatePost />}

        {tab === "my-articles" && <MyArticles />}

        {tab === "saved" && <SavedArticles />}

        {tab === "analytics" && currentUser?.isAdmin && <Analytics />}

        {tab === "users" && currentUser?.isAdmin && <Users />}

        {tab === "comments" && currentUser?.isAdmin && <Comments />}

        {tab === "pending-articles" && currentUser?.isAdmin && (
          <PendingArticles />
        )}

        {tab === "settings" && <Settings />}

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Dashboard;