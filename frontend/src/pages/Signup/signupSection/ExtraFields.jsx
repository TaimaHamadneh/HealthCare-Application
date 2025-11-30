const ExtraFields = ({ formData, errors, handleChange, isLoading }) => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.dateOfBirth ? "error" : ""}
          />
          {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth}</span>}
        </div>
  
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>
  
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.address ? "error" : ""}
        />
        {errors.address && <span className="field-error">{errors.address}</span>}
      </div>
    </>
  );
  
  export default ExtraFields;
  