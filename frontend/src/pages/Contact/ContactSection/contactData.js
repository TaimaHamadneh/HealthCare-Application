import { FaPhoneAlt, FaRegClock, FaEnvelope } from "react-icons/fa";

export const contactInfo = [
  {
    icon: FaPhoneAlt,
    title: "Emergency & Appointments",
    details: [
      "24/7 Emergency: 911",
      "Appointments: (+72) 59-123-963",
      "Billing: (+555) 123-652",
    ],
    description: "Available round the clock for emergencies",
  },

  {
    icon: FaRegClock,
    title: "Operating Hours",
    details: [
      "Emergency: 24/7",
      "Outpatient: 8:00 AM - 6:00 PM",
      "Weekends: 9:00 AM - 4:00 PM",
    ],
    description: "Extended hours for urgent care",
  },

  {
    icon: FaEnvelope,
    title: "Email & Support",
    details: [
      "info@healthcaresystem.com",
      "support@healthcaresystem.com",
      "billing@healthcaresystem.com",
    ],
    description: "We respond within 24 hours",
  },
];

export const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "appointment", label: "Appointment Booking" },
  { value: "billing", label: "Billing & Insurance" },
  { value: "emergency", label: "Emergency Services" },
  { value: "cardiology", label: "Cardiology Department" },
  { value: "neurology", label: "Neurology Department" },
  { value: "pediatrics", label: "Pediatrics Department" },
  { value: "orthopedics", label: "Orthopedics Department" },
];

export const faqData = [
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule appointments by calling our main line, or login to your dashboard.",
  },
  {
    question: "What insurance do you accept?",
    answer:
      "We accept most major insurance providers. Contact our billing department for details.",
  },
  {
    question: "Do you offer telemedicine services?",
    answer: "Yes, we offer virtual consultations for many specialties.",
  },
  {
    question: "What are your visiting hours?",
    answer: "General visiting hours are 8:00 AM to 8:00 PM.",
  },
];
