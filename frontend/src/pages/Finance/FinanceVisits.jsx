import React, { useState } from 'react';

const FinanceVisits = ({ visits, loading, onMarkAsPaid, onViewDetails, onFilter, onRefresh }) => {
  const [filters, setFilters] = useState({
    doctorName: '',
    patientName: '',
    visitId: '',
    status: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      doctorName: '',
      patientName: '',
      visitId: '',
      status: ''
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const getStatusBadge = (status, isPaid) => {
    const statusConfig = {
      scheduled: { class: 'status-scheduled', text: 'Scheduled' },
      'in-progress': { class: 'status-in-progress', text: 'In Progress' },
      completed: { 
        class: isPaid ? 'status-completed' : 'status-pending-payment', 
        text: isPaid ? 'Completed & Paid' : 'Completed - Pending Payment' 
      },
      cancelled: { class: 'status-cancelled', text: 'Cancelled' }
    };

    const config = statusConfig[status];

    if (!config) {
      return (
        <span className="status-badge status-unknown">
          Unknown Status
        </span>
      );
    }

    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const sortedVisits = [...visits].sort((a, b) => {
  return new Date(b.visitDate) - new Date(a.visitDate);
});

  return (
    <div className="finance-visits">
      <div className="visits-header">
        <h2>Visit Payments</h2>
      
      </div>

      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">

          <div className="filter-group">
            <label>Doctor Name</label>
            <input
              type="text"
              value={filters.doctorName}
              onChange={(e) => handleFilterChange('doctorName', e.target.value)}
              placeholder="Search by doctor name..."
            />
          </div>

          <div className="filter-group">
            <label>Patient Name</label>
            <input
              type="text"
              value={filters.patientName}
              onChange={(e) => handleFilterChange('patientName', e.target.value)}
              placeholder="Search by patient name..."
            />
          </div>

          <div className="filter-group">
            <label>Visit ID</label>
            <input
              type="text"
              value={filters.visitId}
              onChange={(e) => handleFilterChange('visitId', e.target.value)}
              placeholder="Search by visit ID..."
            />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button 
          className="btn btn-outline"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="visits-list">
        {loading ? (
          <div className="loading">Loading visits...</div>
        ) : visits.length === 0 ? (
          <div className="no-visits">No visits found matching your criteria</div>
        ) : (
          
          sortedVisits.map(visit => (
            <div key={visit._id} className="visit-card finance-visit-card">
              <div className="visit-header">
                <div className="visit-main-info">
                  <h3>Visit: {visit.visitId}</h3>
                  {getStatusBadge(visit.status, visit.isPaid)}
                </div>
                <div className="visit-amount">
                  <span className="amount-label">Total Amount:</span>
                  <span className="amount-value">{formatCurrency(visit.totalAmount)}</span>
                </div>
              </div>

              <div className="visit-details-grid">
                <div className="detail-group">
                  <label>Patient:</label>
                  <span>{visit.patient?.name} (hone#: {visit.patient?.phone})</span>
                </div>

                <div className="detail-group">
                  <label>Doctor:</label>
                  <span>Dr. {visit.doctor?.name} - {visit.doctor?.specialization}</span>
                </div>

                <div className="detail-group">
                  <label>Visit Date:</label>
                  <span>{formatDate(visit.visitDate)}</span>
                </div>

                {visit.diagnosis && (
                  <div className="detail-group full-width">
                    <label>Diagnosis:</label>
                    <span className="diagnosis-text">{visit.diagnosis}</span>
                  </div>
                )}
              </div>

              <div className="visit-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => onViewDetails(visit)}
                >
                  View Details
                </button>

                {visit.status === 'completed' && !visit.isPaid && (
                  <button 
                    className="btn btn-success"
                    onClick={() => onMarkAsPaid(visit)}
                  >
                    Mark as Paid
                  </button>
                )}

                {visit.isPaid && (
                  <span className="paid-badge">Paid</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FinanceVisits;
