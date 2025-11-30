import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const FinanceContext = createContext();
export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [financeVisits, setFinanceVisits] = useState([]);
  const [financeStats, setFinanceStats] = useState({});

  const fetchFinanceVisits = async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.doctorName) params.append('doctorName', filters.doctorName);
      if (filters.patientName) params.append('patientName', filters.patientName);
      if (filters.visitId) params.append('visitId', filters.visitId);
      if (filters.status) params.append('status', filters.status);

      const url = `/api/finance/visits?${params.toString()}`;
      const { data } = await axios.get(url);
      setFinanceVisits(data);
      return data;
    } catch (err) {
      console.error("Error fetching finance visits:", err);
      throw err;
    }
  };

  const fetchFinanceStats = async () => {
    try {
      const { data } = await axios.get('/api/finance/stats');
      setFinanceStats(data);
      return data;
    } catch (err) {
      console.error("Error fetching finance stats:", err);
      throw err;
    }
  };

  const markVisitAsPaid = async (visitId) => {
    try {
      const { data } = await axios.put(`/api/finance/visits/${visitId}/pay`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark visit as paid');
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        financeVisits,
        financeStats,
        fetchFinanceVisits,
        fetchFinanceStats,
        markVisitAsPaid
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};