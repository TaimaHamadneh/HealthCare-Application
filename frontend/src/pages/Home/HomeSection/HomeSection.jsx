import React from "react";
import "../home.css";
import heroImg from "../../../assets/images/HomeImg.png";

const HomeSection = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-image">
          <img src={heroImg} alt="Healthcare professionals" />
        </div>
        <div className="home-text">
          <h1 className="home-title">
            Welcome to Our Healthcare Platform!
          </h1>
          <p className="home-description">
            We provide trusted medical services, easy appointment scheduling,
            and consultations with top specialists to ensure a smooth and safe
            healthcare experience. Your well-being is our highest priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;