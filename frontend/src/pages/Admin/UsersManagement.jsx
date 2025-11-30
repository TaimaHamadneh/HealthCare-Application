import React, { useState, useEffect } from 'react';
import { fetchAdminUsers, deleteAdminUser } from '../../context/AdminContext';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    loadUsers();
  }, [searchTerm, selectedRole]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminUsers(1, 99999, searchTerm, selectedRole);
      setUsers(data.users);
      setTotalUsers(data.total);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await deleteAdminUser(userId);
        loadUsers();
      } catch (error) {
        setError('Failed to delete user');
      }
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      patient: { class: 'role-patient', text: 'Patient' },
      doctor: { class: 'role-doctor', text: 'Doctor' },
      finance: { class: 'role-finance', text: 'Finance' },
      admin: { class: 'role-admin', text: 'Admin' }
    };
    
    const config = roleConfig[role];
    return <span className={`role-badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="users-management">
      <div className="section-header">
        <h2>Users Management</h2>
        <div className="total-count">Total Users: {totalUsers}</div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="users-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <select 
          value={selectedRole} 
          onChange={handleRoleFilter}
          className="role-filter"
        >
          <option value="">All Roles</option>
          <option value="patient">Patients</option>
          <option value="doctor">Doctors</option>
          <option value="finance">Finance</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                        {user.specialization && (
                          <div className="user-specialization">{user.specialization}</div>
                        )}
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{user.phone || "Not provided"}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="user-actions">
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user._id, user.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersManagement;
