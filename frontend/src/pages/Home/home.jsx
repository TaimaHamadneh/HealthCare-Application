import React from "react";
import HomeSection from "./HomeSection/HomeSection.jsx";
import HeroSection from "./HomeSection/HeroSection.jsx";
import "./home.css";
import '../../variables.css';

const Home = () => {
  return (
    <div>
      <HomeSection />
      <HeroSection />
    </div>
  );
};

export default Home;