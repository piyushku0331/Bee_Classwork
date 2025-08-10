import React from 'react';
import BlogList from '../components/BlogList';
import Navbar from '../components/Navbar';
import DarkModeToggle from '../components/DarkModeToggle';


const Home = () => {
  return (
    <div>
      <Navbar />
      <DarkModeToggle />
      <main className="max-w-4xl mx-auto pt-32 px-4">
        <img
          src="/images/blog/hero.jpg"
          alt="Blogify Hero"
          className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-genz-accent mb-8">Discover Blogs</h1>
        <BlogList />
      </main>
    </div>
  );
};

export default Home;
