import React from "react";
import { motion } from "framer-motion";

const Contact = () => (
  <div className="contact-container">
    <motion.div
      className="contact-card"
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="contact-left">
        <img
          src="/images/blog/contact.png"
          alt="Contact"
          className="contact-image"
        />
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! For feedback, support, or just to say hello, use the form or email us at{" "}
          <a href="mailto:piyushku0331@gmail.com" style={{ color: "#38bdf8" }}>piyushku0331@gmail.com</a>
        </p>
      </div>
      <div className="contact-right">
        <form>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required />
          <small>We’ll never share your email with anyone else.</small>

          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" required />

          <label htmlFor="message">Your message</label>
          <textarea id="message" name="message" rows={4} required />

          <button type="submit" className="btn-primary login-submit-btn">Send Message</button>
        </form>
      </div>
    </motion.div>
  </div>
);

export default Contact;