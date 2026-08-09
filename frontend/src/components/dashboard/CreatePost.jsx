import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filePickerRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    content: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const editId = urlParams.get("edit");

    if (editId) {
      setIsEditMode(true);
      setArticleId(editId);
    }
  }, [location.search]);

  useEffect(() => {
    if (isEditMode && articleId) {
      fetchArticle();
    }
  }, [isEditMode, articleId]);

  const uploadImage = async () => {
    setImageUploadProgress(true);
    setImageUploadError("");

    try {
      const formData = new FormData();

      formData.append("file", imageFile);
      formData.append("upload_preset", "khabarsetu_profile");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/gkhfxnyn/image/upload",
        formData
      );

      setImageUrl(res.data.secure_url);

    } catch (error) {
      setImageUploadError("Image upload failed.");
    } finally {
      setImageUploadProgress(false);
    }
  };

  const fetchArticle = async () => {
    try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/article/${articleId}`,
          {
           withCredentials: true,
          }
        );

        const article = res.data.article;

        setFormData({
          title: article.title,
          summary: article.summary,
          category: article.category,
          content: article.content,
        });

        setImageUrl(article.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a news title.");
      return;
    }

    if (!formData.summary.trim()) {
      alert("Please enter a summary.");
      return;
    }

    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    if (!formData.content.trim()) {
      alert("Please write the article content.");
      return;
    }

    if (!imageUrl) {
      alert("Please select a featured image.");
      return;
    }

    try {
      let res;

      if (isEditMode) {
        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/article/update/${articleId}`,
          {
            ...formData,
            imageUrl,
          },
          {
            withCredentials: true,
          }
        );

        alert("Article updated successfully.");
        navigate("/dashboard?tab=my-articles");
        
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/article/create`,
          {
            ...formData,
            imageUrl,
          },
          {
            withCredentials: true,
          }
        );

        alert("Article published successfully.");
        navigate("/dashboard?tab=my-articles");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEditMode ? "Edit News Article" : "Create News Article"}
        </h1>

        {/* Form will come here */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              News Title
            </label>

            <input
              type="text"
              placeholder="Enter news title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Summary
            </label>

            <textarea
              rows={4}
              placeholder="Write a short summary of the news..."
              value={formData.summary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  summary: e.target.value,
              })
            }
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
            ></textarea>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
              })
            }
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
            >
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="politics">Politics</option>
              <option value="entertainment">Entertainment</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm sm:px-4 sm:text-base"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Article Content
            </label>

            <textarea
              rows={10}
              placeholder="Write your complete news article here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {isEditMode ? "Update Article" : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;