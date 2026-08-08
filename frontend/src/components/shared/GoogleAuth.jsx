import React from "react";
import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { signInSuccess } from "@/app/user/userSlice";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import app from "@/firebase.config";

const GoogleAuth = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const firebaseResponse = await signInWithPopup(auth, provider);

      const res = await axios.post(
        "http://localhost:8000/api/auth/google",
        {
          name: firebaseResponse.user.displayName,
          email: firebaseResponse.user.email,
          profilePhotoUrl: firebaseResponse.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Google Backend Response:", res.data);

      dispatch(
        signInSuccess({
          ...res.data.user,
          token: res.data.token,
        })
      );

      alert("Google Sign In Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);

      alert(error.response?.data?.message || "Google Sign In Failed");
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
        onClick={handleGoogleClick}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;