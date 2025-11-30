import React from "react";
import "../home.css";

const HeroSection  = () => {
  return (
      <div className="hero-wrapper">
        <div className="hero-features">
          <div className="feature-card">
            <h3>Easy Appointment Booking</h3>
            <p>Book your doctor appointments with just a few clicks from the comfort of your home.</p>
          </div>

          <div className="feature-card">
            <h3>Expert Doctors</h3>
            <p>Consult with certified and experienced healthcare professionals from various specialties.</p>
          </div>

          <div className="feature-card">
            <h3>Secure & Private</h3>
            <p>Your medical information is safe, confidential, and protected with advanced security.</p>
          </div>
        </div>
      </div>
  );
};

export default HeroSection ;