import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  SquarePen,
  Newspaper,
  Bookmark,
  ChartColumn,
  User,
  Users,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../../app/user/userSlice";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  console.log(currentUser);

  const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard?tab=dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Create Post",
    path: "/dashboard?tab=create-post",
    icon: <SquarePen size={20} />,
  },
  {
    name: "My Articles",
    path: "/dashboard?tab=my-articles",
    icon: <Newspaper size={20} />,
  },
  {
    name: "Saved Articles",
    path: "/dashboard?tab=saved",
    icon: <Bookmark size={20} />,
  },
  currentUser?.isAdmin && {
    name: "Analytics",
    path: "/dashboard?tab=analytics",
    icon: <ChartColumn size={20} />,
  },
  {
    name: "Profile",
    path: "/dashboard?tab=profile",
    icon: <User size={20} />,
  },
  currentUser?.isAdmin  && {
    name: "Users",
    path: "/dashboard?tab=users",
    icon: <Users size={20} />,
  },
  currentUser?.isAdmin && {
    name: "Comments",
    path: "/dashboard?tab=comments",
    icon: <MessageSquare size={20} />,
  },
  currentUser?.isAdmin && {
    name: "Pending Articles",
    path: "/dashboard?tab=pending-articles",
    icon: <Newspaper size={20} />,
  },
  {
    name: "Settings",
    path: "/dashboard?tab=settings",
    icon: <Settings size={20} />,
  },
];
  

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-5">
      <h2 className="mb-8 text-2xl font-bold">KhabarSetu</h2>

      <nav className="space-y-3">
        {menuItems.filter(Boolean).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => {
              const active =
                isActive &&
                window.location.search ===
                  new URL(item.path, window.location.origin).search;

            return `flex items-center gap-3 rounded-lg p-3 transition-colors ${
              active
                ? "bg-slate-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
              }`;
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={async () => {
          try{
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/auth/signout`,
              {
                method: "POST",
                credentials: "include",
              }
            );
            
            if (!res.ok) {
              throw new Error("Logout failed");
            }

            dispatch(signOutSuccess());
            navigate("/sign-in");

          } catch (error) {
            console.error("Logout error:", error);
          }
        }}
        className="mt-8 flex w-full items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;