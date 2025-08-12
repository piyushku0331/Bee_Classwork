import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      {/* Left Image */}
      <div className="footer-image">
        <div className="image-circle">
          <img src="/images/blog/blogging.png" alt="Logo" />
        </div>
      </div>

      {/* Middle Info */}
      <div className="footer-info">
        <h2>
          PIYUSH <span className="highlight">KUMAR</span>
        </h2>
        <h4 className="footer-title">Full Stack Developer</h4>
        <p>
          Passionate about crafting responsive, interactive, and visually
          appealing web applications with modern technologies.
        </p>

        {/* Social Links */}
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="footer-contact">
        <p>
          <FaPhoneAlt /> <a href="tel:7988327875">7988327875</a>
        </p>
        <p>
          <FaEnvelope />{" "}
          <a href="mailto:piyushku0331@gmail.com">piyushku0331@gmail.com</a>
        </p>
        <p>
          <FaGlobe />{" "}
          <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
            localhost:5173
          </a>
        </p>
      </div>
    </div>

    {/* Yellow Bottom Bar */}
    <div className="footer-bottom">
      <p>
        <FaMapMarkerAlt /> Chandigarh, India
      </p>
      <div className="footer-circles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </footer>
);

export default Footer;