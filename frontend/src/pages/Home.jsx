import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/home/SearchBar";
import TrendingNews from "../components/home/TrendingNews";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import LatestNews from "../components/home/LatestNews";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchArticles();
    fetchSavedArticles();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchArticles(search, selectedCategory);
    }, 400);  

    return () => clearTimeout(delay);
  }, [search, selectedCategory]);

  const fetchArticles = async ( query = "", category = "All" ) => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/article`;

      const params = [];

      if (query) {
        params.push(`query=${query}`);
      }

      if (category !== "All") {
        params.push(`category=${encodeURIComponent(category)}`);
      }

      if (params.length > 0) {
        url += `/search?${params.join("&")}`;
      }

      const res = await axios.get(url);

      setArticles(res.data.articles);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavedArticles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/saved`,
        {
          withCredentials: true,
        }
      );

      const ids = res.data.savedArticles.map(
        (article) => article._id
      );

      setSavedArticles(ids);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveArticle = async (articleId) => {
    try {
      const isSaved = savedArticles.includes(articleId);

      if (isSaved) {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/user/unsave/${articleId}`,
          {
            withCredentials: true,
          }
        );

        alert(res.data.message);
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/user/save/${articleId}`,
          {},
          {
            withCredentials: true,
          }
        );

        alert(res.data.message);
      }

      fetchSavedArticles();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">

      <HeroSection
        article={articles[0]}
        latestArticles={articles.slice(1, 5)}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TrendingNews
        articles={articles}
      />

      <LatestNews
        articles={articles}
        savedArticles={savedArticles}
        handleSaveArticle={handleSaveArticle}
      />

    </div>
  );
};

export default Home;