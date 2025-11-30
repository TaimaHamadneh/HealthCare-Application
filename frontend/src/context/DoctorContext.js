import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [visits, setVisits] = useState([]);
  const [currentVisit, setCurrentVisit] = useState(null);

  const fetchDoctorVisits = async (status = "") => {
    try {
      let url = "/api/doctors/visits";
      if (status) url += `?status=${status}`;
      const { data } = await axios.get(url);
      setVisits(data);
      return data;
    } catch (err) {
      console.error("Error fetching doctor visits:", err);
      throw err;
    }
  };

  const startVisit = async (visitId) => {
    try {
      const activeVisit = visits.find(v => v.status === 'in-progress');
      if (activeVisit && activeVisit._id !== visitId) {
        throw new Error('Complete the current visit first');
      }
      const data = (await axios.put(`/api/doctors/visits/${visitId}/start`)).data;
      setCurrentVisit(data);
//      await fetchDoctorVisits();
      return data;
    } catch (err) {
      console.error("Error starting visit:", err);
      throw err;
    }
  };

  const updateTreatments = async (visitId, visitData) => {
    try {
      const data = (await axios.put(`/api/doctors/visits/${visitId}/treatments`, visitData)).data;
      return data;
    } catch (err) {
      console.error("Error updating treatments:", err);
      throw err;
    }
  };

  const completeVisit = async (visitId) => {
    try {
      const data = (await axios.put(`/api/doctors/visits/${visitId}/complete`)).data;
      setCurrentVisit(null);
      return data;
    } catch (err) {
      console.error("Error completing visit:", err);
      throw err;
    }
  };

  const hasActiveVisit = () => visits.some(v => v.status === 'in-progress');

  return (
    <DoctorContext.Provider
      value={{
        visits,
        currentVisit,
        fetchDoctorVisits,
        startVisit,
        updateTreatments,
        completeVisit,
        hasActiveVisit
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
