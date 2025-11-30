import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from "./context/FinanceContext";
import { PatientProvider } from "./context/PatientContext";
import { DoctorProvider } from "./context/DoctorContext";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/home';
import Services from './pages/Services/services';
import About from './pages/About/about';
import ContactUs from './pages/Contact/contact';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import PatientDashboard from './pages/patient/PatientDashboard'; 
import DoctorDashboard from './pages/Doctor/DoctorDashboard'; 
import FinanceDashboard from './pages/Finance/FinanceDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './App.css';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['patient']}>
                    <PatientProvider>
                       <PatientDashboard />
                    </PatientProvider>
                  </RoleBasedRoute>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['doctor']}>
                    <DoctorProvider> 
                       <DoctorDashboard />
                    </DoctorProvider>
                  </RoleBasedRoute>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/finance-dashboard" 
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['finance']}>
                     <FinanceProvider>
                         <FinanceDashboard />
                      </FinanceProvider>
                  </RoleBasedRoute>
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;