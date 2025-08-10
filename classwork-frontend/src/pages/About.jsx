import React from 'react';

const About = () => (
  <div className="card max-w-2xl mx-auto mt-24 flex flex-col items-center">
    <img
      src="/images/blog/decor1.jpg"
      alt="Decorative"
      className="w-32 h-32 object-cover rounded-full mb-4 shadow-lg border-2 border-genz-accent"
    />
    <h1 className="text-3xl font-bold mb-4 text-genz-accent">About Us</h1>
    <p className="text-genz-text mb-2">
      Blogify is a modern GenZ-inspired blogging platform where you can share your stories, ideas, and connect with a vibrant community. Our mission is to empower everyone to express themselves and discover new perspectives.
    </p>
    <p className="muted">Made with 💜 for the next generation of creators.</p>
  </div>
);

export default About;
