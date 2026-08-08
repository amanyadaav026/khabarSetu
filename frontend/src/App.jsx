import React from "react"
import { Routes, Route } from "react-router-dom";
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import NewsArticles from "./pages/NewsArticles"
import SingleArticle from "./pages/SingleArticle";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
    <Header />
    <ScrollToTop />
    <Routes>
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/news" element={<NewsArticles />} />
      <Route path="/article/:articleId" element={<SingleArticle />} />
    </Routes>

    <Footer />
    </>
  );
};

export default App;
