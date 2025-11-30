import React from "react";
import servicesImage from "../../../assets/images/Services.png";
import '../services.css';
import '../../../variables.css';

const SpecializedCare = () => {
  return (
    <section className="specialized-care">
      <div className="specialized-content">
        <div className="specialized-text">
          <h2>Specialized Medical Care</h2>
          <p>
            Our healthcare system brings together world-class specialists and cutting-edge 
            technology to provide comprehensive medical care. From routine check-ups to 
            complex surgical procedures, we are committed to delivering exceptional 
            healthcare services tailored to your needs.
          </p>

          <div className="care-features">
            <div className="feature">
              <span className="check-icon">✓</span>
              <span>Board-certified specialists</span>
            </div>
            <div className="feature">
              <span className="check-icon">✓</span>
              <span>Advanced medical technology</span>
            </div>
            <div className="feature">
              <span className="check-icon">✓</span>
              <span>Personalized treatment plans</span>
            </div>
            <div className="feature">
              <span className="check-icon">✓</span>
              <span>Multidisciplinary approach</span>
            </div>
          </div>
        </div>

        <div className="specialized-image">
          <div className="image-placeholder">
            <img src={servicesImage} alt="Healthcare Services" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedCare;
