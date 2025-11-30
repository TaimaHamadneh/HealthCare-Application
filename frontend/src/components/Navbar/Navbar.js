import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HealthIcon from "../../assets/icons/health-icon.png";
import { MdDashboard } from "react-icons/md";

import "./Navbar.css";
import "../../variables.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Check if current page is a dashboard
  const isDashboardPage = location.pathname.includes("dashboard");

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img src={HealthIcon} alt="logo" className="nav-logo-icon" />
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>

          {user ? (
            <>
              {!isDashboardPage && (
                <li className="nav-item">
                  <Link
                    to={`/${user.role}-dashboard`}
                    className="nav-link dashboard-link"
                  >
                    <MdDashboard className="dash-icon" /> Dashboard
                  </Link>
                </li>
              )}

              <li className="nav-item user-info">
                <span className="nav-welcome">
                  Welcome, <strong>{user.name}</strong>
                </span>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link login-link">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
