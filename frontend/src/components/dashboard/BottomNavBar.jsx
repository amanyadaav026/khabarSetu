import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-black/10 bg-white/95 px-3 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <Link
        to="/dashboard?tab=profile"
        className="flex min-w-16 flex-col items-center gap-1 text-slate-700 transition-colors hover:text-red-600"
      >
        <User size={22} />
        <span className="text-xs">Profile</span>
      </Link>

      <Link
        to="/dashboard?tab=saved"
        className="flex min-w-16 flex-col items-center gap-1 text-slate-700 transition-colors hover:text-red-600"
      >
        <Bookmark size={22} />
        <span className="text-xs">Saved</span>
      </Link>

      <Link
        to="/dashboard?tab=settings"
        className="flex min-w-16 flex-col items-center gap-1 text-slate-700 transition-colors hover:text-red-600"
      >
        <Settings size={22} />
        <span className="text-xs">Settings</span>
      </Link>

      <button className="flex min-w-16 flex-col items-center gap-1 text-slate-700 transition-colors hover:text-red-600">
        <LogOut size={22} />
        <span className="text-xs">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;