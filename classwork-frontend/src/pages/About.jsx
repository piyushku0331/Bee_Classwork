import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-bg">
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="about-card"
      >
        <img
          src="/images/blog/decor1.jpg"
          alt="Decorative"
          className="about-card-img"
        />
        <h1 className="about-card-title">
          About Us
        </h1>
        <p className="about-card-desc">
          Blogify isn’t just a blogging platform — it’s a universe for creativity, ideas, and
          connections. Inspired by the vibrant energy of Gen Z, we’ve built a space where
          authenticity meets innovation.
        </p>
        <p className="about-card-desc2">
          From sharing personal stories to exploring trending topics, Blogify is your stage to shine.
          We empower voices from all walks of life to inspire, educate, and entertain. Whether you’re
          a casual writer, an aspiring journalist, or a storyteller at heart — this is your home.
        </p>
        <p className="about-card-signoff">
          Made with 💜 for the next generation of dreamers, thinkers, and creators.
        </p>
      </motion.div>
    </div>
  );
};

export default About;