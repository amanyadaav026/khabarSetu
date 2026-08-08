import React from "react";
import ArticleCard from "./ArticleCard";


const LatestNews = ({
  articles,
  savedArticles,
  handleSaveArticle,
}) => {

  return (

    <section>

      <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        Latest News
      </h2>


      {articles.length === 0 ? (

        <div className="rounded-xl border p-6 text-center sm:p-8">

          <h2 className="text-lg font-semibold sm:text-xl">
            No Articles Found
          </h2>


          <p className="mt-2 text-gray-500">
            Articles will appear here once published.
          </p>

        </div>


      ) : (


        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">

          {articles.map((article) => (

            <ArticleCard
              key={article._id}
              article={article}
              savedArticles={savedArticles}
              handleSaveArticle={handleSaveArticle}
            />

          ))}

        </div>


      )}


    </section>

  );
};


export default LatestNews;