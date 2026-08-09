import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../../app/user/userSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signout`,
        {},
        {
           withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }

    } catch (error) {
        console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>

      <button
        onClick={handleSignOut} 
        className="mt-6 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Settings;