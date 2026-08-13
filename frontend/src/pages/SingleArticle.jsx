import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import CommentSection from "../components/dashboard/CommentSection";

const SingleArticle = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/article/${articleId}`
      );

      setArticle(res.data.article);
    } catch (error) {
      console.log(error);
    }
  };

  if (!article) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        Loading...
      </div>
    );
  }

  const articleUrl = window.location.href;
  const shareText = `${article.title} - KhabarSetu`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy link:", error);
    }
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n${articleUrl}`
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(articleUrl)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="h-56 w-full rounded-xl object-cover sm:h-80 lg:h-96"
      />

      <h1 className="mt-4 text-3xl font-bold leading-tight sm:mt-6 sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-8">
        {article.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500 sm:gap-3 sm:text-sm">
        <span>{article.category}</span>

        <span>•</span>

        <span>{article.author.username}</span>

        <span>•</span>

        <span>
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Share Article */}
      <div className="relative mt-5">
        <button
          onClick={() => setShowShareMenu((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Share2 size={17} />
          Share
        </button>

        {showShareMenu && (
          <div className="absolute left-0 top-12 z-20 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <button
              onClick={shareOnWhatsApp}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>

            <button
              onClick={handleCopyLink}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={shareOnFacebook}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                f
              </span>
              Facebook
            </button>

            <button
              onClick={shareOnX}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span className="text-base font-semibold">X</span>
              X
            </button>

            <button
              onClick={shareOnLinkedIn}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-sm bg-blue-700 text-xs font-bold text-white">
                in
              </span>
              LinkedIn
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-800 sm:mt-8 sm:text-lg sm:leading-8">
        {article.content}
      </div>

      <div className="mt-10 sm:mt-12">
        <CommentSection articleId={article._id} />
      </div>
    </div>
  );
};

export default SingleArticle;