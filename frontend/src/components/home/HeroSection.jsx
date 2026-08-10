import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ article, latestArticles }) => {
  const navigate = useNavigate();

  if (!article) return null;

  return (
    <section className="mt-10">

      {/* Top Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_0.8fr] lg:gap-5">
        {/* Left Image */}

        {/* Left Hero */}

        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            onClick={() => navigate(`/article/${article._id}`)}
            className="h-105 w-full cursor-pointer object-cover transition-transform duration-700 hover:scale-105 sm:h-120 lg:h-150"
          />

          {/* Dark Gradient */}

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

          {/* Hero Content */}

          <div className="absolute bottom-0 left-0 z-10 w-full p-5 sm:p-7 lg:p-12">
            <span className="inline-block rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
              {article.category}
            </span>
            
            <h1
              onClick={() => navigate(`/article/${article._id}`)}
              className="mt-3 max-w-4xl cursor-pointer text-xl font-black leading-tight text-white transition hover:text-red-300 sm:mt-4 sm:text-4xl lg:mt-5 lg:text-5xl"
            >
              {article.title}
            </h1>
            
            <p className="mt-3 max-w-3xl line-clamp-2 text-xs leading-5 text-gray-200 sm:mt-4 sm:line-clamp-3 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {article.summary}
            </p>
            
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-gray-300 sm:mt-6 sm:gap-4 sm:text-sm">
              <span>👤 {article.author?.username}</span>

              <span>•</span>

              <span>
                📅 {new Date(article.createdAt).toLocaleDateString()}
              </span>

              <span>•</span>
              
              <span>👁 {article.views} Views</span>
            </div>

            <button
              onClick={() => navigate(`/article/${article._id}`)}
              className="mt-5 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:mt-7 sm:px-8 sm:py-4 sm:text-base"
            >
              Read Full Story →
            </button>
          </div>
        </div>


        {/* Right Headlines */}

        <aside className="border-t border-black/15 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

          <h2 className="mb-5 text-2xl font-black text-slate-900 sm:text-3xl lg:mb-6 lg:text-4xl">
            Latest Headlines
          </h2>

          {latestArticles?.map((item, index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/article/${item._id}`)}
              className="group cursor-pointer rounded-xl border-b border-black/15 px-2 py-4 transition-all duration-300 hover:bg-slate-50 hover:shadow-sm last:border-none sm:px-3 sm:py-5"
            >
              <div className="flex gap-3 sm:gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
                />

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-2xl font-black text-slate-300 sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mt-2 text-[13px] font-bold leading-5 text-slate-900 transition-colors duration-300 group-hover:text-red-600 sm:mt-3 sm:text-lg sm:leading-7">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
                    {item.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default HeroSection;
