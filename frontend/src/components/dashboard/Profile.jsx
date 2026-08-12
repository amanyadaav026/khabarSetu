import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOutSuccess,
} from "../../app/user/userSlice";

import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Pencil,
  Trash2,
  Newspaper,
  Bookmark,
  MessageSquare,
  TrendingUp,
  MapPin,
} from "lucide-react";

const stats = [
  {
    title: "Articles Read",
    value: "0",
    icon: Newspaper,
    color: "bg-slate-900 text-white",
  },
  {
    title: "Saved",
    value: "0",
    icon: Bookmark,
    color: "bg-red-600 text-white",
  },
  {
    title: "Comments",
    value: "0",
    icon: MessageSquare,
    color: "bg-blue-600 text-white",
  },
  {
    title: "Reputation",
    value: "New",
    icon: TrendingUp,
    color: "bg-emerald-600 text-white",
  },
];

const Profile = () => {
  console.log("PROFILE RENDER", Date.now());
  

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editMode = searchParams.get("edit") === "true";

  const [formData, setFormData] = useState({
    username: currentUser?.username || currentUser?.name || "",
    email: currentUser?.email || "",
  });
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      dispatch(updateUserStart());

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );  

      dispatch(updateUserSuccess(res.data.user));

      searchParams.delete("edit");
      setSearchParams(searchParams);
      

    } catch (error) {
      dispatch(
        updateUserFailure(
          error.response?.data?.message || error.message
        )
      );
    }
  };

  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(signOutSuccess());

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  
  const username =
    currentUser?.username ||
    currentUser?.name ||
    "Guest User";

  const email =
    currentUser?.email ||
    "Not Available";

  const profilePhoto =
    currentUser?.profilePhotoUrl || null;

  const role = currentUser?.isAdmin
    ? "Administrator"
    : "Reader";

  const joinedDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString()
    : "Recently Joined";
  
  const filePickerRef = useRef(null);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(false);

    try {
      const formData = new FormData();

      formData.append("file", imageFile);
      formData.append("upload_preset", "khabarsetu_profile");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/gkhfxnyn/image/upload",
        formData
      );

      console.log(res.data.secure_url);

      setImageFileUrl(res.data.secure_url);
      dispatch(updateUserStart());

      const updateRes = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        {
        profilePhotoUrl: res.data.secure_url,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        updateUserSuccess({
          ...updateRes.data.user,
          token: currentUser.token,
        })
      );

      setImageFileUploading(false);

    } catch (error) {
      console.log(error);
      dispatch(
        updateUserFailure(
          error.response?.data?.message || error.message
        )
      );
      setImageFileUploadError(true);
      setImageFileUploading(false);
    }
  };
  
  useEffect(() => {
    if(imageFile){
      const previewUrl = URL.createObjectURL(imageFile);
      setImageFileUrl(previewUrl);
      uploadImage();
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          hidden
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            e.target.value = "";
          }}
        />

        {/* Hero Section */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="h-44 bg-linear-to-r from-slate-900 via-slate-800 to-red-600" />

          <div className="relative px-4 pb-6 sm:px-8 sm:pb-8">

           <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Profile Info */}
              <div className="flex flex-col items-center gap-6 lg:flex-row">
                
                {/* Profile Image */}
                <div
                  className="-mt-20 h-36 w-36 shrink-0 cursor-pointer overflow-hidden rounded-full border-8 border-white bg-white shadow-xl sm:h-40 sm:w-40 lg:-mt-20"
                  onClick={() => filePickerRef.current?.click()}
                >
                  {imageFileUrl || profilePhoto ? (
                    <img
                      src={imageFileUrl || profilePhoto}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200">
                      <User size={70} className="text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Name + Email */}
                <div className="w-full text-center lg:w-auto lg:text-left">

                  {editMode ? (
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-2xl font-bold text-slate-900 outline-none focus:border-red-500 sm:text-4xl lg:max-w-sm"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                      {username}
                    </h1>
                  )}

                  {editMode  ? (
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 sm:text-lg lg:max-w-md"
                    />
                  ) : (
                    <p className="mt-2 break-all text-sm text-slate-500 sm:text-lg">
                      {email}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                      {role}
                    </span>

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 sm:px-4 sm:text-sm">
                      Verified Account
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">

                {!editMode  ? (
                  <button
                    type="button"
                    onClick={() =>  {
                      searchParams.set("edit", "true");
                      setSearchParams(searchParams);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-red-600 lg:w-auto"
                  >
                    <Pencil size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 lg:w-auto"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          username: currentUser?.username || currentUser?.name || "",
                          email: currentUser?.email || "",
                        });
                        searchParams.delete("edit");
                        setSearchParams(searchParams);
                      }}
                      className="w-full rounded-xl bg-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-700 lg:w-auto"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 lg:w-auto"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </>
                )}
              </div>

            </div>
           </form>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>
            );
          })}

        </div>

        {/* Bottom Grid */}

        <div className="grid gap-8 xl:grid-cols-3">

          {/* Account Information */}

          <div className="xl:col-span-2 rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Account Information
            </h2>

            <div className="grid gap-8 md:grid-cols-2">

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-slate-900 p-3 text-white">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Username
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {username}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-red-600 p-3 text-white">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {email}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Role
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {role}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-600 p-3 text-white">
                  <Calendar size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Joined
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {joinedDate}
                  </h3>
                </div>
              </div>
            </div>

          </div>

          {/* Profile Summary */}

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Profile Summary
            </h2>

            <div className="space-y-6">

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">
                  Account Status
                </p>

                <h3 className="mt-2 text-lg font-semibold text-emerald-600">
                  Active
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="text-red-600" size={18} />
                  <span className="font-medium text-slate-900">
                    India
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">
                  Reading Level
                </p>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Beginner
                </h3>
              </div>

              <div className="rounded-2xl bg-linear-to-r from-slate-900 to-red-600 p-5 text-white">
                <h3 className="text-xl font-bold">
                  Welcome to KhabarSetu 🚀
                </h3>

                <p className="mt-2 text-sm text-slate-200">
                  Stay updated with trusted news, save articles,
                  and personalize your reading experience.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-900">
              Recent Activity
            </h2>

            <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600">
              Latest
            </span>

          </div>

          <div className="mt-8 space-y-5">

            <div className="flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-500 hover:shadow-md">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Newspaper size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  No articles read yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your reading history will appear here.
                </p>
              </div>

            </div>

            <div className="flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-500 hover:shadow-md">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                <Bookmark size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  No saved articles
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Bookmark articles to read them later.
                </p>
              </div>

            </div>

            <div className="flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-500 hover:shadow-md">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <MessageSquare size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  No comments yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Join discussions by commenting on news articles.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;