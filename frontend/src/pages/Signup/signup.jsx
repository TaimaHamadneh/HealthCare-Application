import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import BasicFields from "./signupSection/BasicFields";
import ExtraFields from "./signupSection/ExtraFields";
import DoctorFields from "./signupSection/DoctorFields";

import { validateSignup } from "./signupSection/validateSignup";
import { FaExclamationTriangle } from "react-icons/fa";

import "./signup.css";
import "../../variables.css";
import HealthIcon from "../../assets/icons/health-icon.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    dateOfBirth: "",
    phone: "",
    address: "",
    specialization: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignup(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        ...(formData.role !== "doctor" && {
          specialization: undefined,
          licenseNumber: undefined,
        }),
      };

      const result = await register(submitData);

      if (!result.success) throw new Error(result.message);

      navigate("/login");
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="signup-header">
          <img src={HealthIcon} alt="logo" className="login-logo-icon" />
          <h1>Create Your Account</h1>
          <p>Join our healthcare system and manage your medical journey</p>
        </div>

        {errors.submit && (
          <div className="error-message">
            <span>  <FaExclamationTriangle className="error-icon-react" />
            </span> {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">

          <BasicFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            isLoading={isLoading}
          />

          <ExtraFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            isLoading={isLoading}
          />

          {formData.role === "doctor" && (
            <DoctorFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              isLoading={isLoading}
            />
          )}

          <div className="terms-section">
            <label className="checkbox-container">
              <input type="checkbox" required disabled={isLoading} />
              <span className="checkmark"></span>
              I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className={`signup-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Create Account"}
          </button>
        </form>

        <div className="login-section">
          <p>Already have an account? <Link to="/login" className="signin-link">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
