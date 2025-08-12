import React from 'react';
import BlogList from '../components/BlogList';
// ...existing code...

const Home = () => {
  return (
    <div>
// ...existing code...

      <main className="home-main">
        <img
          src="/images/blog/hero.jpg"
          alt="Blogify Hero"
          className="home-hero-img"
        />
        <h1 className="home-title">Discover Blogs</h1>
        <BlogList />
      </main>
    </div>
  );
};

export default Home;
