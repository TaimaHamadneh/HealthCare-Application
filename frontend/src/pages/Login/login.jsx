import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css';
import "../../variables.css";
import { FaExclamationTriangle } from "react-icons/fa";

import TextInput from "./loginSection/TextInput";  
import { validateLogin } from "./loginSection/loginValidation";
import { loginUser } from "./loginSection/authService";

import HealthIcon from "../../assets/icons/health-icon.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginUser(login, formData.email, formData.password);

      if (!result.success) throw new Error(result.message);

      const role = result.user?.role;

      const routes = {
        patient: "/patient-dashboard",
        doctor: "/doctor-dashboard",
        finance: "/finance-dashboard",
        admin: "/admin-dashboard",
      };

      navigate(routes[role] || "/dashboard");

    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <img src={HealthIcon} alt="logo" className="login-logo-icon" />
          <h1>Sign In to Your Account</h1>
        </div>

        {errors.submit && (
          <div className="error-message">
            <span className="error-icon">
            <FaExclamationTriangle className="error-icon-react" />

            </span>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          <TextInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            placeholder="Enter your email address"
          />

          <TextInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            placeholder="Enter your password"
          />

          <button className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : "Sign In"}
          </button>

        </form>

        <div className="signup-section">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
