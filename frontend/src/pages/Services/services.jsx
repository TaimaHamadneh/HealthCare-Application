import React, { useState } from 'react';
import './services.css';
import '../../variables.css';
import { services, emergencyServices } from "./ServiceSection/servicesData";
import SpecializedCare from "./ServiceSection/SpecializedCare";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const toggleServiceDetails = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Medical Services</h1>
        <p className="services-subtitle">
          Comprehensive healthcare services delivered with compassion and expertise
        </p>
      </div>
     
      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className={`service-card ${activeService === service.id ? 'active' : ''}`}
            onClick={() => toggleServiceDetails(service.id)}
          >
            <div className="service-header">
              <div className="service-icon">  <service.icon className="icon-style" />
              </div>
              <div className="service-title-section">
                <h3>{service.title}</h3>
                {service.emergency && <span className="emergency-badge">Emergency</span>}
              </div>
              <div className="expand-icon">
                {activeService === service.id ? '−' : '+'}
              </div>
            </div>
            <p className="service-description">{service.description}</p>

            <div className={`service-details ${activeService === service.id ? 'show' : ''}`}>
              <h4>Available Treatments:</h4>
              <ul>
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <section className="emergency-services-section">
        <h2>Emergency & Critical Care</h2>
        <div className="emergency-grid">
          {emergencyServices.map((service, index) => (
            <div key={index} className="emergency-service-card">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SpecializedCare/>
    </div>
  );
};

export default Services;