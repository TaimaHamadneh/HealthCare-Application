import React from 'react';

const VisitDetailsModal = ({ visit, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusDisplay = (status, isPaid) => {
    if (status === 'completed' && isPaid) return 'Completed & Paid';
    if (status === 'completed' && !isPaid) return 'Completed - Pending Payment';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content visit-details-modal">
        <div className="modal-header">
          <h2>Visit Details - {visit.visitId}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="details-content">
          <div className="details-section">
            <h3>Basic Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Status:</label>
                <span>{getStatusDisplay(visit.status, visit.isPaid)}</span>
              </div>
              <div className="detail-item">
                <label>Visit Date:</label>
                <span>{formatDate(visit.visitDate)}</span>
              </div>
              <div className="detail-item">
                <label>Total Amount:</label>
                <span className="amount">{formatCurrency(visit.totalAmount)}</span>
              </div>
              <div className="detail-item">
                <label>Payment Status:</label>
                <span className={visit.isPaid ? 'status-paid' : 'status-unpaid'}>
                  {visit.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          </div>

          <div className="details-section"> 
            <h3>Patient Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Name:</label>
                <span>{visit.patient?.name}</span>
              </div>
              <div className="detail-item">
                <label>Phone:</label>
                <span>{visit.patient?.phone}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Doctor Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Name:</label>
                <span>Dr. {visit.doctor?.name}</span>
              </div>
              <div className="detail-item">
                <label>Specialization:</label>
                <span>{visit.doctor?.specialization}</span>
              </div>
            </div>
          </div>

          {visit.symptoms && (
            <div className="details-section">
              <h3>Symptoms</h3>
              <p>{visit.symptoms}</p>
            </div>
          )}

          {visit.diagnosis && (
            <div className="details-section">
              <h3>Diagnosis</h3>
              <p>{visit.diagnosis}</p>
            </div>
          )}

          {visit.notes && (
            <div className="details-section">
              <h3>Doctor's Notes</h3>
              <p>{visit.notes}</p>
            </div>
          )}

          {visit.treatments && visit.treatments.length > 0 && (
            <div className="details-section">
              <h3>Treatments & Costs</h3>
              <div className="treatments-table">
                <div className="table-header">
                  <span>Treatment</span>
                  <span>Description</span>
                  <span>Cost</span>
                </div>
                {visit.treatments.map((treatment, index) => (
                  <div key={index} className="table-row">
                    <span className="treatment-name">{treatment.treatmentName}</span>
                    <span className="treatment-desc">{treatment.description || 'N/A'}</span>
                    <span className="treatment-cost">{formatCurrency(treatment.value)}</span>
                  </div>
                ))}
                <div className="table-footer">
                  <span></span>
                  <span><strong>Total:</strong></span>
                  <span><strong>{formatCurrency(visit.totalAmount)}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitDetailsModal;