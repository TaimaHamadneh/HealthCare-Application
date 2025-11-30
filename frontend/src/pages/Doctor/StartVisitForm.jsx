import React, { useState } from 'react';
import { useDoctor } from '../../context/DoctorContext';

const StartVisitForm = ({ visit, onBack, onComplete, onAddMedicalInfo }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { startVisit } = useDoctor();

  const handleStartExamination = async () => {
    try {
      if (visit.status === 'scheduled') {
        await startVisit(visit._id);
      }

      setCurrentStep(2);

    } catch (error) {
      alert('Error starting visit: ' + error.message);
    }
  };

  const handleGoBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleCompleteSetup = () => {
    onAddMedicalInfo();
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

            <button 
              className="btn btn-primary"
              onClick={handleStartExamination}
            >
              {visit.status === 'in-progress' ? 'Continue Examination' : 'Start Examination'}
            </button>
          </div>
        );

      case 2:
        return (
          <div className="visit-step">
            <h3>Medical Examination</h3>
            <div className="examination-info">
              <p>Record your initial observations and examination findings...</p>
            </div>

            <div className="step-actions">
              <button 
                className="btn btn-outline"
                onClick={handleGoBackToStep1}
              >
                Back
              </button>

              <button 
                className="btn btn-primary"
                onClick={handleCompleteSetup}
              >
                Add Medical Information & Treatments
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
      <div className="form-header">
        <button className="btn btn-outline" onClick={onBack}>
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
