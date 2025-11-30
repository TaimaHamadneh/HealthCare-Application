import React from 'react';
import { FiClipboard, FiClock, FiActivity, FiCheckCircle } from "react-icons/fi";

const DoctorStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Visits',
      value: stats.totalVisits,
      icon: <FiClipboard />,
      color: '#3498db'
    },
    {
      title: 'Scheduled',
      value: stats.scheduledVisits,
      icon: <FiClock />,
      color: '#f39c12'
    },
    {
      title: 'In Progress',
      value: stats.inProgressVisits,
      icon: <FiActivity />,
      color: '#e74c3c'
    },
    {
      title: 'Completed',
      value: stats.completedVisits,
      icon: <FiCheckCircle />,
      color: '#27ae60'
    }
  ];

  return (
    <div className="stats-container">
      <h2>Visit Overview</h2>
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorStats;