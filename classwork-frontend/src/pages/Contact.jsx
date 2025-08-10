import React from 'react';

const Contact = () => (
  <div className="card max-w-2xl mx-auto mt-24 flex flex-col items-center">
    <img
      src="/images/blog/decor2.jpg"
      alt="Decorative"
      className="w-32 h-32 object-cover rounded-full mb-4 shadow-lg border-2 border-genz-accent2"
    />
    <h1 className="text-3xl font-bold mb-4 text-genz-accent">Contact Us</h1>
    <p className="text-genz-text mb-2">
      Have questions, feedback, or want to collaborate? Reach out to us at <a href="mailto:contact@blogify.com" className="text-genz-accent underline">contact@blogify.com</a> or use the form below.
    </p>
    <form className="flex flex-col gap-4 mt-4">
      <input className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none" type="text" placeholder="Your Name" required />
      <input className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none" type="email" placeholder="Your Email" required />
      <textarea className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none" placeholder="Your Message" rows={4} required></textarea>
      <button className="btn-primary self-end" type="submit">Send</button>
    </form>
  </div>
);

export default Contact;
