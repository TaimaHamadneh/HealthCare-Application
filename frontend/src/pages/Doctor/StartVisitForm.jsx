import React, { useState } from 'react';
import { useDoctor } from '../../context/DoctorContext';

const StartVisitForm = ({ visit, onBack, onComplete, onAddMedicalInfo }) => {
  const [currentStep, setCurrentStep] = useState(visit.status === 'in-progress' ? 2 : 1);
  const { startVisit } = useDoctor();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleStartExamination = async () => {
    try {
      setErrorMessage(""); // Clear previous errors
      setShowError(false);

      if (visit.status === 'scheduled') {
        await startVisit(visit._id);
      }

      setCurrentStep(2);

    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleGoBackToStep1 = () => {
    setCurrentStep(1);
    setShowError(false); // Hide error when navigating
  };

  const handleCompleteSetup = () => {
    setShowError(false); // Hide error when proceeding
    onAddMedicalInfo();
  };

  const handleBackToVisits = () => {
    setShowError(false); // Hide error when going back
    onBack();
  };

  const closeError = () => {
    setShowError(false);
    setErrorMessage("");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="visit-step">
            <h3>Patient Information</h3>
            <div className="patient-info">
              <p><strong>Name:</strong> {visit.patient?.name}</p>
              <p><strong>Phone:</strong> {visit.patient?.phone}</p>
              <p><strong>Date of Birth:</strong> {new Date(visit.patient?.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Symptoms:</strong> {visit.symptoms}</p>
            </div>

            <div className="step-actions">
              <button 
                className="btn btn-outline"
                onClick={handleBackToVisits}
              >
                Back to Visits
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={handleStartExamination}
              >
                {visit.status === 'in-progress' ? 'Continue Examination' : 'Start Examination'}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="visit-step">
            <h3>Medical Examination</h3>
            <div className="examination-info">
              <p>Record your initial observations and examination findings...</p>
              {visit.diagnosis && (
                <div className="existing-info">
                  <p><strong>Current Diagnosis:</strong> {visit.diagnosis}</p>
                </div>
              )}
            </div>

            <div className="step-actions">
              <button 
                className="btn btn-outline"
                onClick={handleGoBackToStep1}
              >
                Back to Patient Info
              </button>

              <button 
                className="btn btn-primary"
                onClick={handleCompleteSetup}
              >
                {visit.diagnosis ? 'Update Medical Information' : 'Add Medical Information & Treatments'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="start-visit-form">
      {showError && (
        <div className="error-modal-overlay">
          <div className="error-modal">
            <div className="error-modal-header">
              <h3>Unable to Start Visit</h3>
              <button className="close-btn" onClick={closeError}>×</button>
            </div>
            <div className="error-modal-body">
              <div className="error-icon">⚠️</div>
              <p>{errorMessage}</p>
            </div>
            <div className="error-modal-actions">
              <button className="btn btn-primary ok-button" onClick={closeError}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="form-header">
        <button className="btn btn-outline" onClick={handleBackToVisits}>
          ← Back to Visits
        </button>

        <h2>Managing Visit: {visit.patient?.name}</h2>

        <div className="progress-steps">
          <span className={currentStep >= 1 ? 'active' : ''}>1. Patient Info</span>
          <span className={currentStep >= 2 ? 'active' : ''}>2. Examination</span>
        </div>
      </div>

      <div className="form-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default StartVisitForm;
