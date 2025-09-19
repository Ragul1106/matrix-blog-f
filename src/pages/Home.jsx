import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-500 via-purple-50 to-pink-200  flex flex-col items-center justify-center text-center px-14 py-24">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute lg:bottom-10 right-10 w-48 h-48 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 animate-fadeIn">
        Welcome to Matrix Blogs ✍️
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12 animate-fadeIn delay-150">
        A place where ideas, stories, and experiences come alive.  
        Browse through insightful blogs, share your thoughts, and create your own posts once you log in.
      </p>

      <div className="flex flex-col md:flex-row gap-4 animate-fadeIn delay-300">
        <Link
          to="/blog"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Explore Blogs
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Login to Write
        </Link>
      </div>
    </div>
  );
};

export default Home;
