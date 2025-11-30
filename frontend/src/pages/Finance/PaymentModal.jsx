import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext'; 

const PaymentModal = ({ visit, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const { markVisitAsPaid } = useFinance();

  const handleMarkAsPaid = async () => {
    setProcessing(true);
    try {
      await markVisitAsPaid(visit._id);
      onSuccess();
    } catch (error) {
      alert('Error marking visit as paid: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-modal">
        <div className="modal-header">
          <h2>Mark Visit as Paid</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="payment-details">
          <div className="payment-info">
            <div className="info-row">
              <label>Visit ID:</label>
              <span>{visit.visitId}</span>
            </div>
            <div className="info-row">
              <label>Patient:</label>
              <span>{visit.patient?.name}</span>
            </div>
            <div className="info-row">
              <label>Doctor:</label>
              <span>Dr. {visit.doctor?.name}</span>
            </div>
            <div className="info-row">
              <label>Total Amount:</label>
              <span className="total-amount">{formatCurrency(visit.totalAmount)}</span>
            </div>
          </div>

          <div className="payment-warning">
            <p>This action will mark the visit as paid and update the financial records.</p>
          </div>
        </div>
 
        <div className="modal-actions">
          <button 
            className="btn btn-outline"
            onClick={onClose}
            disabled={processing}
          >
            Cancel
          </button>
          <button 
            className="btn btn-success"
            onClick={handleMarkAsPaid}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
