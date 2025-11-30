import React from 'react';
import ContactForm from './ContactSection/ContactForm';
import ContactInfo from './ContactSection/ContactInfo';
import FAQ from './ContactSection/FAQ';
import './contact.css';
import "../../variables.css";

const ContactUs = () => {
  return (
    <div className="contact-container">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          We're here to help you. Get in touch with our healthcare professionals.
        </p>
      </div>

      <div className="contact-content">
        <ContactForm />
        <ContactInfo />
      </div>

      <FAQ />
    </div>
  );
};

export default ContactUs;
