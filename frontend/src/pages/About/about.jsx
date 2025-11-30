import React from 'react';
import './about.css';
import '../../variables.css';
import { FaHospital, FaUserMd, FaRegClock, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Healthcare System</h1>
        <p className="subtitle">Compassionate Care, Advanced Medicine, Close to Home</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
          We are committed to offering our community top-notch healthcare services using cutting-edge technology, 
          knowledgeable medical personnel, and compassionate care.   
          Every person we serve receives the best possible medical care thanks to our patient-centered approach.
          </p>
        </section>

        <div className="about-features-grid">
          <div className="about-feature-card">
            <div className="icon"><FaHospital /></div>
            <h3>Advanced Facilities</h3>
            <p>Modern facilities and cutting-edge medical equipment.</p>
          </div>
          <div className="about-feature-card">
            <div className="icon"><FaUserMd /></div>
            <h3>Expert Doctors</h3>
            <p>Physicians and specialists with board certification</p>
          </div>
          <div className="about-feature-card">
            <div className="icon"><FaRegClock /></div>
            <h3>24/7 Emergency</h3>
            <p>24-hour critical care and emergency services</p>
          </div>
          <div className="about-feature-card">
            <div className="icon"><FaHeart /></div>
            <h3>Patient Care</h3>
            <p>Personalized and compassionate treatment regimens</p>
          </div>
        </div>

        <section className="stats-section">
          <div className="stat-item">
            <h4>50+</h4>
            <p>Medical Specialties</p>
          </div>
          <div className="stat-item">
            <h4>200+</h4>
            <p>Healthcare Professionals</p>
          </div>
          <div className="stat-item">
            <h4>25K+</h4>
            <p>Patients Served Annually</p>
          </div>
          <div className="stat-item">
            <h4>15+</h4>
            <p>Years of Service</p>
          </div>
        </section>

        <section className="commitment-section">
          <h2>Our Commitment</h2>
          <p>
            We believe in accessible, affordable, and high-quality healthcare for all. 
            To meet the changing needs of our patients, our healthcare system consistently makes investments 
            in medical research, employee training, and community outreach initiatives.
          </p>
          <div className="commitment-points">
            <div className="point">
              <h4>Quality & Safety</h4>
              <p>Strict procedures to ensure quality and protect patient safety.</p>
            </div>
            <div className="point">
              <h4>Innovation</h4>
              <p>Implementing latest medical technologies and treatments.</p>
            </div>
            <div className="point">
              <h4>Community</h4>
              <p>Active involvement in community health programs.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;