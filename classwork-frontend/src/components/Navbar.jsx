import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Basic search handler: navigates to /?search=query (replace with real search logic as needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-3xl bg-genz-card/90 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-between px-6 py-3 border border-genz-accent">
      <div className="flex items-center gap-6">
        <img
          src="/images/blog/avatar1.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-genz-accent shadow-md mr-2"
        />
        <Link to="/" className="font-genz text-xl font-bold text-genz-accent tracking-wide select-none">Blogify</Link>
        <Link to="/about" className="muted hover:text-genz-accent transition">About Us</Link>
        <Link to="/contact" className="muted hover:text-genz-accent2 transition">Contact</Link>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center w-2/3">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l-xl bg-genz-bg text-genz-text placeholder-genz-muted focus:outline-none focus:ring-2 focus:ring-genz-accent"
          placeholder="Search authors, genres, blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="btn-primary rounded-r-xl px-5 py-2 border-l border-genz-accent"
        >
          🔍
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
