import React from "react";

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {

  const categories = [
    "All",
    "politics",
    "sports",
    "technology",
    "entertainment",
    "business",
    "local News",
  ];


  return (
    <section>

      <h2 className="text-xl font-bold sm:text-2xl">
        Explore Categories
      </h2>


      <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-4">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition sm:px-5 sm:py-2 sm:text-base ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {category}
          </button>

        ))}

      </div>


    </section>
  );
};


export default CategorySection;