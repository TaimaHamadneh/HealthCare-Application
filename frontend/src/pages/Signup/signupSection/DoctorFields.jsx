import { SPECIALTIES } from "./specialties";

const DoctorFields = ({ formData, errors, handleChange, isLoading }) => (
  <div className="doctor-fields">
    <h3>Professional Information</h3>

    <div className="form-row">
      <div className="form-group">
        <label>Specialization *</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.specialization ? "error" : ""}
        >
          <option value="">Select Specialization</option>
          {SPECIALTIES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.specialization && <span className="field-error">{errors.specialization}</span>}
      </div>

      <div className="form-group">
        <label>License Number *</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.licenseNumber ? "error" : ""}
        />
        {errors.licenseNumber && (
          <span className="field-error">{errors.licenseNumber}</span>
        )}
      </div>
    </div>
  </div>
);

export default DoctorFields;
