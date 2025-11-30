import React from "react";
import { FaGlobe, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import "./Footer.css";
import '../../variables.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="brand-name">Health Care</h3>
          <p className="brand-tagline">Where Better Health Begins — Empowering Every Step of Your Wellness Journey.</p>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="icon" aria-label="Website">
              <FaGlobe />
            </a>
            <a href="#" className="icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="icon" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" className="icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Health Care. All rights reserved.</p>
      </div>
    </footer>
  );
}