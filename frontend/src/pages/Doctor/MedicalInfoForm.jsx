import React, { useState } from 'react';
import { useDoctor } from '../../context/DoctorContext';

const MedicalInfoForm = ({ visit, onClose, onSave, onComplete }) => {
  const { updateTreatments, completeVisit , fetchDoctorVisits} = useDoctor();
  const [formData, setFormData] = useState({
    diagnosis: visit.diagnosis || '',
    notes: visit.notes || '',
    treatments: visit.treatments && visit.treatments.length > 0 ? visit.treatments : [{
      treatmentName: '',
      description: '',
      value: 0
    }]
  });

  const handleTreatmentChange = (index, field, value) => {
    const updatedTreatments = [...formData.treatments];
    updatedTreatments[index][field] = field === 'value' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, treatments: updatedTreatments });
  };

  const addTreatment = () => {
    setFormData({
      ...formData,
      treatments: [
        ...formData.treatments,
        { treatmentName: '', description: '', value: 0 }
      ]
    });
  };

  const removeTreatment = (index) => {
    const updatedTreatments = formData.treatments.filter((_, i) => i !== index);
    setFormData({ ...formData, treatments: updatedTreatments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTreatments(visit._id, formData);
      await completeVisit(visit._id); 
      await fetchDoctorVisits(); 
      onSave(); 
    } catch (error) {
      alert('Error saving medical information: ' + error.message);
      return;
    }
  };

  const calculateTotal = () => {
    return formData.treatments.reduce((total, treatment) => 
      total + (parseFloat(treatment.value) || 0), 0
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content medical-form">
        <div className="modal-header">
          <h2>Medical Information - {visit.patient?.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Diagnosis</label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
              placeholder="Enter diagnosis..."
              rows="3"
              required
            />
          </div>

          <div className="form-section">
            <label>Medical Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter additional notes..."
              rows="3"
            />
          </div>

          <div className="form-section">
            <div className="section-header">
              <label>Treatments & Medications</label>
              <button type="button" className="btn btn-outline" onClick={addTreatment}>
                + Add Treatment
              </button>
            </div>

            {formData.treatments.map((treatment, index) => (
              <div key={index} className="treatment-item">
                <div className="treatment-row">
                  <input
                    type="text"
                    placeholder="Treatment/Medication name"
                    value={treatment.treatmentName}
                    onChange={(e) => handleTreatmentChange(index, 'treatmentName', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={treatment.value}
                    onChange={(e) => handleTreatmentChange(index, 'value', e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                  {formData.treatments.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => removeTreatment(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <textarea
                  placeholder="Treatment description, dosage, instructions..."
                  value={treatment.description}
                  onChange={(e) => handleTreatmentChange(index, 'description', e.target.value)}
                  rows="2"
                />
              </div>
            ))}

            <div className="total-amount">
              <strong>Total Amount: ${calculateTotal().toFixed(2)}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Medical Info
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalInfoForm;
