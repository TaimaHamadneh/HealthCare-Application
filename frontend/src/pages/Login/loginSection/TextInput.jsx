import React from 'react';

const TextInput = ({ label, type="text", name, value, onChange, error, disabled, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input 
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        placeholder={placeholder}
        disabled={disabled}
      />

      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default TextInput;
