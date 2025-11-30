import React from 'react';
import { FiDollarSign,  FiUsers, FiClock } from "react-icons/fi";
import {  FaUserMd,  FaUserInjured,  FaMoneyBillWave } from "react-icons/fa";
import {  MdAssignment,  MdLocalHospital } from "react-icons/md";

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toLocaleString() || '0'}`,
      icon: <FiDollarSign size={26} color="#fff" />,
      color: '#27ae60',
      subtitle: 'Total income'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FiUsers size={26} color="#fff" />,
      color: '#3498db',
      subtitle: 'All system users'
    },
    {
      title: 'Patients',
      value: stats.totalPatients,
      icon: <FaUserInjured size={26} color="#fff" />,
      color: '#2ecc71',
      subtitle: 'Registered patients'
    },
    {
      title: 'Doctors',
      value: stats.totalDoctors,
      icon: <FaUserMd size={26} color="#fff" />,
      color: '#9b59b6',
      subtitle: 'Medical professionals'
    },
    {
      title: 'Finance Staff',
      value: stats.totalFinance,
      icon: <FaMoneyBillWave size={26} color="#fff" />,
      color: '#f39c12',
      subtitle: 'Finance team members'
    },
    {
      title: 'Total Visits',
      value: stats.totalVisits,
      icon: <MdAssignment size={26} color="#fff" />,
      color: '#e74c3c',
      subtitle: 'All time visits'
    },
    {
      title: 'Pending Payments',
      value: `$${stats.pendingPayments?.toLocaleString() || '0'}`,
      icon: <FiClock size={26} color="#fff" />,
      color: '#e67e22',
      subtitle: 'Awaiting payment'
    },
    {
      title: 'Active Visits',
      value: stats.activeVisits,
      icon: <MdLocalHospital size={26} color="#fff" />,
      color: '#d35400',
      subtitle: 'Currently in progress'
    }
  ];

  return (
    <div className="admin-stats">
      <div className="stats-header">
        <h2>System Overview</h2>
      </div>

      <div className="stats-grid admin-stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card admin-stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-subtitle">{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
