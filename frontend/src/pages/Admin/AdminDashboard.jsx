import React, { useState, useEffect } from 'react';
import { fetchAdminStats } from '../../context/AdminContext';
import AdminStats from './AdminStats';
import UsersManagement from './UsersManagement';

import { FiBarChart2, FiUsers } from "react-icons/fi";

import './admin.css';
import "../../variables.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0, 
    totalFinance: 0,
    totalVisits: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    activeVisits: 0,
    visitsByStatus: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchAdminStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadAdminData} className="btn btn-primary">
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <AdminStats stats={stats} />;

      case 'users':
        return <UsersManagement />;

      default:
        return <AdminStats stats={stats} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>System overview and management</p>
        </div>
        <div className="user-info">
          <span className="user-role">Administrator</span>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiBarChart2 size={18} /> Overview
        </button>

        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers size={18} /> Users
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
