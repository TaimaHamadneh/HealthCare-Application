import React from 'react';

const VisitHistory = ({ visits }) => {
  return (
    <div className="visit-history">
      <h2>All Your Visits</h2>
      
      {visits.length === 0 ? (
        <div className="no-visits">
          <p>You don't have any visits yet.</p>
        </div> 
      ) : (
        <div className="visits-container">
          {visits.map(visit => (
            <div key={visit._id} className="visit-card">
              <div className="visit-header">
                <h3>Visit #{visit.visitId}</h3>
                <span className={`status-badge ${visit.status}`}>
                  {visit.status}
                </span>
              </div>
              <div className="visit-details">
                <p><strong>Doctor:</strong> Dr. {visit.doctor?.name}</p>
                <p><strong>Specialization:</strong> {visit.doctor?.specialization}</p>
                <p><strong>Date & Time:</strong> {new Date(visit.visitDate).toLocaleString()}</p>
                <p><strong>Symptoms:</strong> {visit.symptoms || 'Not specified'}</p>
                
                {visit.diagnosis && (
                  <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                )}
                
                {visit.treatments && visit.treatments.length > 0 && (
                  <div className="treatments">
                    <strong>Treatments:</strong>
                    <ul>
                      {visit.treatments.map((treatment, index) => (
                        <li key={index}>
                          {treatment.treatmentName} - ${treatment.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {visit.totalAmount > 0 && (
                  <p><strong>Total Amount:</strong> ${visit.totalAmount} 
                    <span className={`payment-status ${visit.isPaid ? 'paid' : 'pending'}`}>
                      {visit.isPaid ? ' (Paid)' : ' (Pending)'}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitHistory;