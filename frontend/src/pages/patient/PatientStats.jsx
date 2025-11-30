import React from 'react';
import { MdBarChart, MdUpcoming, MdCheckCircle } from "react-icons/md";

const PatientStats = ({ stats }) => {
  return (
    <div className="patient-stats">
      <h2>My Visits Overview</h2>
      
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <MdBarChart size={28} />
          </div>
          <div className="stat-info">
            <h3>Total Visits</h3>
            <div className="stat-number">{stats.totalVisits}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MdUpcoming size={28} />
          </div>
          <div className="stat-info">
            <h3>Upcoming Visits</h3>
            <div className="stat-number">{stats.upcomingVisits}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MdCheckCircle size={28} />
          </div>
          <div className="stat-info">
            <h3>Completed Visits</h3>
            <div className="stat-number">{stats.completedVisits}</div>
          </div>
        </div>

      </div>

      <div className="quick-stats">
        <h3>Visit Status Overview</h3>
        <div className="status-bars">

          <div className="status-item">
            <span className="status-label">Completed Visits</span>
            <div className="status-bar">
              <div 
                className="status-fill completed"
                style={{
                  width: `${stats.totalVisits ? (stats.completedVisits / stats.totalVisits) * 100 : 0}%`
                }}
              ></div>
            </div>
            <span className="status-count">{stats.completedVisits}</span>
          </div>

          <div className="status-item">
            <span className="status-label">Upcoming Visits</span>
            <div className="status-bar">
              <div 
                className="status-fill upcoming"
                style={{
                  width: `${stats.totalVisits ? (stats.upcomingVisits / stats.totalVisits) * 100 : 0}%`
                }}
              ></div>
            </div>
            <span className="status-count">{stats.upcomingVisits}</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PatientStats;
