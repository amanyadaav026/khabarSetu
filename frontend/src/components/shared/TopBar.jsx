import React from "react";
import { useSelector } from "react-redux";

const TopBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="hidden md:block border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <p className="text-sm text-slate-500">
          {today}
        </p>

        {/* Center */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-semibold text-red-600">
            Breaking
          </span>

          <span className="text-sm text-slate-600">
            Trusted Community News Platform
          </span>
        </div>

        {/* Right */}

        {currentUser ? (
          <p className="text-sm font-medium text-slate-700">
            Welcome, {currentUser.username}
          </p>
        ) : (
          <p className="text-sm text-slate-600">
            Welcome to KhabarSetu
          </p>
        )}

      </div>
    </div>
  );
};

export default TopBar;