import React, { useState, useEffect } from "react";
//import { useAuth } from '../../context/AuthContext';
import { AiOutlineWarning } from "react-icons/ai";

import { usePatient } from '../../context/PatientContext';

const BookingScreen = ({ onBookingSuccess }) => {
  const { fetchDoctors, fetchAvailableSlots, bookVisit } = usePatient();
 
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) loadSlots();
  }, [selectedDoctor, selectedDate]);

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch {
      setError("Failed to load doctors");
    }
  };

  const loadSlots = async () => {
    try {
      const available = await fetchAvailableSlots(selectedDoctor, selectedDate);
      setAvailableSlots(available);
    } catch {
      setError("Cannot load available slots");
    }
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await bookVisit(selectedDoctor, selectedDate, selectedTime, symptoms);

      alert("Visit booked successfully!");

      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("");
      setSymptoms("");

      if (onBookingSuccess) onBookingSuccess();

    } catch (err) {
      setError("Booking failed");
    }

    setLoading(false);
  };
  return (
    <div className="booking-container">
      <div className="booking-screen">
        <div className="booking-header">
          <h2>Book a Medical Visit</h2>
          <p>Select a doctor, date and time for your appointment</p>
        </div>

        {error && (
          <div className="error-message">
              <AiOutlineWarning size={22} color="#ff4d4f" />  {error}
          </div>
        )}

        <form onSubmit={submitBooking} className="booking-form">
          <div className="form-section">
            <h3>Select Doctor</h3>
            <div className="doctors-grid">
              {doctors.map(doc => (
                <div
                  key={doc._id}
                  className={`doctor-card ${doc._id === selectedDoctor ? "selected" : ""}`}
                  onClick={() => setSelectedDoctor(doc._id)}
                >
                  <div className="doctor-avatar">{doc.name[0]}</div>
                  <div className="doctor-info">
                    <h4>{doc.name}</h4>
                    <p className="doctor-specialty">{doc.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <h3>Select Date</h3>
              <input
                type="date"
                className="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {selectedDate && (
              <div className="form-section">
                <h3>Select Time</h3>
                <div className="time-slots-grid">
                  {timeSlots.map(slot => {
                    const isBooked = !availableSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        className={`time-slot ${selectedTime === slot ? "selected" : ""} ${isBooked ? "disabled" : ""}`}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {availableSlots.length === 0 && (
                  <p className="no-slots">No available slots for this date</p>
                )}
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Symptoms (Optional)</h3>
            <textarea
              className="symptoms-textarea"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms..."
              rows="4"
            />
          </div>
          <button
            className="book-button"
            disabled={loading || !selectedDoctor || !selectedDate || !selectedTime}
            type="submit"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingScreen;
