import React from "react";
import { contactInfo } from "./contactData";

const ContactInfo = () => {
  return (
    <section className="contact-info-section">
      <div className="info-header">
        <h2>Get in Touch</h2>
        <p>Multiple ways to reach our healthcare team</p>
      </div>

      <div className="contact-info-grid">
        {contactInfo.map((info, index) => (
          <div key={index} className="info-card">
            <div className="info-icon">  <info.icon className="contact-icon" />
            </div>

            <div className="info-content">
              <h4>{info.title}</h4>

              <div className="info-details">
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>

              <p className="info-description">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
