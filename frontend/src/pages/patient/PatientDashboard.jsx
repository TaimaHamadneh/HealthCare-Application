import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePatient } from '../../context/PatientContext';

import { MdDashboard, MdEventNote, MdHistory } from "react-icons/md";

import BookingScreen from './BookingScreen';
import VisitHistory from './VisitHistory';
import PatientStats from './PatientStats';

import './patient.css';
import "../../variables.css";

const PatientDashboard = () => {
  const { user } = useAuth();           
  const { stats, visits, fetchVisits } = usePatient();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <PatientStats stats={stats} />;
      case 'book':
        return <BookingScreen onBookingSuccess={fetchVisits} />;
      case 'history':
        return <VisitHistory visits={visits} refreshVisits={fetchVisits} />;
      default:
        return <PatientStats stats={stats} />;
    }
  };

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your healthcare overview and visit information</p>
        </div>
        <div className="user-info">
          <span className="user-role">Patient</span>
        </div>
      </div>

      <div className="dashboard-tabs">

        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <MdDashboard size={20} /> &nbsp; Overview
        </button>

        <button
          className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          <MdEventNote size={20} /> &nbsp; Book Visit
        </button>

        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <MdHistory size={20} /> &nbsp; Visit History
        </button>

      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientDashboard;
