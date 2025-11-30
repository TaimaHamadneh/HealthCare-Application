const BasicFields = ({ formData, errors, handleChange, isLoading }) => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
  
        <div className="form-group">
          <label>Account Type *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.role ? "error" : ""}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="finance">Finance Staff</option>
          </select>
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>
      </div>
  
      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>
  
      <div className="form-row">
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>
  
        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="field-error">{errors.confirmPassword}</span>
          )}
        </div>
      </div>
    </>
  );
  
  export default BasicFields;
  