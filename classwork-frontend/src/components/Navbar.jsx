import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();

  // Hide navbar on auth-related pages
  const hideNavbarPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-otp"
  ];
  if (hideNavbarPaths.includes(location.pathname)) return null;

  return (
    <nav className="new-navbar">
      {/* Logo */}
      <div className="navbar-logo">
  <img src="/images/blog/blogging.png" alt="Logo" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'contain' }} />
      </div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>

      {/* Right side */}
      <div className="navbar-right">
        <ThemeToggle />
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
