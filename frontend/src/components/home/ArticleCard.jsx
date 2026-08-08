import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({
  article,
  savedArticles,
  handleSaveArticle,
}) => {
    const navigate = useNavigate();

  return (
    <div
      className="group rounded-2xl border bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >

      <div className="relative">
        {new Date() - new Date(article.createdAt) < 24 * 60 * 60 * 1000 && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            NEW
          </span>
        )}  

          {article.views >= 100 && (
            <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-black shadow-lg sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
            🔥 TRENDING
            </span>
          )}
        
        
        <img
          src={article.imageUrl}
          alt={article.title}
          onClick={() => navigate(`/article/${article._id}`)}
          className="h-52 w-full cursor-pointer rounded-xl object-cover transition-transform duration-300 hover:scale-105 sm:h-60"
        />

      </div>


      <h2 
        onClick={() => navigate(`/article/${article._id}`)}
        className="mt-3 cursor-pointer text-xl font-bold leading-7 transition-colors duration-300 hover:text-red-600 sm:mt-4 sm:text-2xl"
      >
        {article.title}
      </h2>


      <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
        {article.summary}
      </p>


      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500 sm:mt-4 sm:gap-3 sm:text-sm">

        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700 sm:px-3 sm:text-sm">
          {article.category}
        </span>


        <span>
          • {article.author.username}
        </span>


        <span>
          • {new Date(article.createdAt).toLocaleDateString()}
        </span>

      </div>


      <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">

        <button
          onClick={() => navigate(`/article/${article._id}`)}
          className="rounded-lg border px-3.5 py-2 text-sm font-medium hover:bg-gray-100 sm:px-4 sm:text-base"
        >
          Read More
        </button>

        <button
          onClick={() => handleSaveArticle(article._id)}
          className="flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium hover:bg-gray-100 sm:gap-2 sm:px-4 sm:text-base"
        >
          <Bookmark
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              savedArticles.includes(article._id)
                ? "fill-current text-blue-600"
                : ""
            }`}
          />

          {savedArticles.includes(article._id)
            ? "Saved"
            : "Save"}
        </button>
      </div>
    </div>
  );
};


export default ArticleCard;