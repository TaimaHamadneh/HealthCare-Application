import axios from 'axios';

export const fetchAdminStats = async () => {
  try {
    const { data } = await axios.get('/api/admin/stats');
    return data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};

export const fetchAdminUsers = async (page = 1, limit = 10, search = '', role = '') => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (role) params.append('role', role);

    const { data } = await axios.get(`/api/admin/users?${params.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching admin users:', error);
    throw error;
  }
};

export const deleteAdminUser = async (userId) => {
  try {
    await axios.delete(`/api/admin/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
