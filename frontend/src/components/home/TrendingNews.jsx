import React from "react";


const TrendingNews = ({ articles }) => {

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
              className="h-48 w-full rounded-xl object-cover sm:h-40"
            />


            <h3 className="mt-3 text-lg font-bold leading-6 sm:mt-4 sm:text-xl">
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