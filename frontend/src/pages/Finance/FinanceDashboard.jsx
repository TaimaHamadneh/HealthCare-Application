import React, { useState, useEffect } from 'react';
import { useFinance  } from '../../context/FinanceContext';
import FinanceVisits from './FinanceVisits';
import PaymentModal from './PaymentModal.jsx';
import VisitDetailsModal from './VisitDetailsModal';
import './finance.css';
import "../../variables.css";

const FinanceDashboard = () => {
  const { 
    financeVisits,
    fetchFinanceVisits,
  } = useFinance();

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    handleFetchVisits();
  }, []);

  const handleFetchVisits = async (filters = {}) => {
    setLoading(true);

    const mergedFilters = { ...currentFilters, ...filters };
    setCurrentFilters(mergedFilters);
    try {
      await fetchFinanceVisits(mergedFilters);
    } catch (error) {
      alert('Error loading visits');
    }
    setLoading(false);
  };

  const handleMarkAsPaid = (visit) => {
    setSelectedVisit(visit);
    setShowPaymentModal(true);
  };

  const handleViewDetails = (visit) => {
    setSelectedVisit(visit);
    setShowDetailsModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedVisit(null);
    handleFetchVisits();
  };

  return (
    <div className="finance-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Financial Dashboard</h1>
          <p>Manage payments, review visit costs, and track revenue</p>
        </div>
        <div className="user-info">
          <span className="user-role">Finance Employee</span>
        </div>
      </div>

      <div className="dashboard-content">
        <FinanceVisits 
          visits={financeVisits}
          loading={loading}
          onMarkAsPaid={handleMarkAsPaid}
          onViewDetails={handleViewDetails}
          onFilter={handleFetchVisits} 
          onRefresh={handleFetchVisits}
        />
      </div>

      {showPaymentModal && selectedVisit && (
        <PaymentModal
          visit={selectedVisit}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showDetailsModal && selectedVisit && (
        <VisitDetailsModal
          visit={selectedVisit}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default FinanceDashboard;
