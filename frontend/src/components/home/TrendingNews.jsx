import React from "react";
import { useNavigate } from "react-router-dom";


const TrendingNews = ({ articles }) => {

  const navigate = useNavigate();

  const trendingArticles = articles.slice(0, 3);


  return (
    <section>

      <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        🔥 Trending News
      </h2>


      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">

        {trendingArticles.map((article) => (

          <div
            key={article._id}
            className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
          >

            <img
              src={article.imageUrl}
              alt={article.title}
              onClick={() => navigate(`/article/${article._id}`)}
              className="h-48 w-full cursor-pointer rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02] sm:h-40"
            />


            <h3 
              onClick={() => navigate(`/article/${article._id}`)}
              className="mt-3 cursor-pointer text-lg font-bold leading-6 transition-colors hover:text-red-600 sm:mt-4 sm:text-xl">
              {article.title}
            </h3>


            <p className="mt-2 text-sm leading-6 text-gray-600">
              {article.summary}
            </p>


            <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 sm:text-sm">
              {article.category}
            </span>


          </div>

        ))}

      </div>


    </section>
  );
};


export default TrendingNews;