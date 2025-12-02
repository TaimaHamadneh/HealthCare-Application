import React, { useState } from 'react';
import { useDoctor } from "../../context/DoctorContext";

const DoctorVisits = ({ visits, onStartVisit, onAddMedicalInfo, hasActiveVisit }) => {
  const [filter, setFilter] = useState('all');

  const filteredVisits = visits.filter(visit => {
    if (filter === 'all') return true;
    return visit.status === filter;
  });

  const sortVisits = (visitsList) => {
    const now = new Date();

    const inProgress = visitsList
      .filter(v => v.status === "in-progress")
      .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));

    const upcoming = visitsList
      .filter(v => v.status === "scheduled" && new Date(v.visitDate) >= now)
      .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));

    const others = visitsList
      .filter(v => !(v.status === "scheduled" && new Date(v.visitDate) >= now))
      .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));

    return [...inProgress, ...upcoming, ...others];
  };

  const sortedVisits = sortVisits(filteredVisits);
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { class: 'status-scheduled', text: 'Scheduled' },
      'in-progress': { class: 'status-in-progress', text: 'In Progress' },
      completed: { class: 'status-completed', text: 'Completed' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled' }
    };
  
    const config = statusConfig[status] || { class: 'status-unknown', text: status || 'Unknown' };
  
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <div className="visits-container">
      <div className="visits-header">
        <h2>Patient Visits</h2>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Visits</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="visits-list">
        {sortedVisits.length === 0 ? (
          <div className="no-visits">No visits found</div>
        ) : (
          sortedVisits.map(visit => (
            <div key={visit._id} className="visit-card">
              <div className="visit-header">
                <h3>{visit.patient?.name}</h3>
                {getStatusBadge(visit.status)}
              </div>
              
              <div className="visit-details">
                <p><strong>Date:</strong> {formatDate(visit.visitDate)}</p>
                <p><strong>Patient Phone:</strong> {visit.patient?.phone}</p>
                {visit.symptoms && <p><strong>Symptoms:</strong> {visit.symptoms}</p>}
                {visit.diagnosis && <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>}
                {visit.totalAmount > 0 && <p><strong>Total Amount:</strong> ${visit.totalAmount}</p>}
              </div>

              <div className="visit-actions">
                {visit.status === 'in-progress' ? (
                  <>
                    <button 
                      className="btn btn-primary"
                      onClick={() => onStartVisit(visit)}
                    >
                      Continue Visit
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => onAddMedicalInfo(visit)}
                    >
                      Add Medical Info
                    </button>
                  </>
                ) : visit.status === 'scheduled' ? (
                  <button 
                    className="btn btn-primary"
                    onClick={() => onStartVisit(visit)}
                  >
                    Start Visit
                  </button>
                ) : visit.status === 'completed' ? (
                  <button 
                    className="btn btn-outline"
                    onClick={() => onAddMedicalInfo(visit)}
                  >
                    View/Edit Medical Info
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorVisits;
