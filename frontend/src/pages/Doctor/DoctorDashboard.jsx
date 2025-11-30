import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDoctor } from '../../context/DoctorContext';

import DoctorStats from './DoctorStats';
import DoctorVisits from './DoctorVisits';
import StartVisitForm from './StartVisitForm';
import MedicalInfoForm from './MedicalInfoForm';
import { FiBarChart2, FiUsers } from "react-icons/fi";  
import './doctor.css';
import '../../variables.css';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { fetchDoctorVisits, visits, hasActiveVisit } = useDoctor();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showMedicalForm, setShowMedicalForm] = useState(false);

  useEffect(() => {
    fetchDoctorVisits();
  }, []);

  const handleStartVisit = async (visit) => {
    try {
      setSelectedVisit(visit);
      setActiveTab('current-visit');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddMedicalInfo = (visit) => {
    setSelectedVisit(visit);
    setShowMedicalForm(true);
  };

  const handleMedicalFormClose = () => {
    setShowMedicalForm(false);
    setSelectedVisit(null);
    fetchDoctorVisits(); 
  };

  const handleCompleteVisit = async (visitId) => {
    try {

      await fetchDoctorVisits();
      setActiveTab('visits');
      setSelectedVisit(null);
    } catch (error) {
      alert('Error completing visit: ' + error.message);
    }
  };
  const handleBackFromVisit = () => {
    setSelectedVisit(null); 
    setActiveTab('visits');
  };
  const stats = {
    totalVisits: visits.length,
    scheduledVisits: visits.filter(v => v.status === 'scheduled').length,
    inProgressVisits: visits.filter(v => v.status === 'in-progress').length,
    completedVisits: visits.filter(v => v.status === 'completed').length
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DoctorStats stats={stats} />;
      case 'visits':
        return (
          <DoctorVisits 
            visits={visits}
            onStartVisit={handleStartVisit}
            onAddMedicalInfo={handleAddMedicalInfo}
            refreshVisits={fetchDoctorVisits}
            currentVisit={selectedVisit}
          />
        );
      case 'current-visit':
        return selectedVisit ? (
          <StartVisitForm 
            visit={selectedVisit}
            onBack={handleBackFromVisit}
            onComplete={handleCompleteVisit}
            onAddMedicalInfo={() => handleAddMedicalInfo(selectedVisit)}
          />
        ) : (
          <div>No visit selected</div>
        );
      default:
        return <DoctorStats stats={stats} />;
    }
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome, Dr. {user?.name}!</h1>
          <p>Manage your patient visits and medical records</p>
        </div>
        <div className="user-info">
          <span className="user-role">Doctor</span>
          <span className="specialization">{user?.specialization}</span>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        > 
          <FiBarChart2 className="tab-icon" /> Overview
        </button>

        <button
          className={`tab-button ${activeTab === 'visits' ? 'active' : ''}`}
          onClick={() => setActiveTab('visits')}
        >
          <FiUsers className="tab-icon" /> Patient Visits
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>

      {showMedicalForm && selectedVisit && (
        <MedicalInfoForm
          visit={selectedVisit}
          onClose={handleMedicalFormClose}
          onSave={handleMedicalFormClose}
          onComplete={handleCompleteVisit}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;