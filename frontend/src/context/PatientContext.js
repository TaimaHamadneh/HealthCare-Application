import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const PatientContext = createContext();
export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    upcomingVisits: 0,
    completedVisits: 0
  });

  useEffect(() => {
    if (isAuthenticated && user?.role === "patient") {
      fetchVisits();
    }
  }, [isAuthenticated, user]);

  const fetchVisits = async () => {
    try {
      const { data } = await axios.get('/api/patients/visits');
      setVisits(data);

      setStats({
        totalVisits: data.length,
        upcomingVisits: data.filter(v => v.status === "scheduled").length,
        completedVisits: data.filter(v => v.status === "completed").length
      });
    } catch (err) {
      console.error("Error fetching patient visits:", err);
    }
  };

  const fetchDoctors = async () => {
    return (await axios.get("/api/patients/doctors")).data;
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    return (await axios.get(`/api/patients/available-slots?doctorId=${doctorId}&date=${date}`)).data;
  };

  const bookVisit = async (doctorId, date, time, symptoms) => {
    try {
      const visitDate = `${date}T${time}`;
      await axios.post("/api/patients/visits", { doctorId, visitDate, symptoms });
      await fetchVisits();
    } catch (err) {
      console.error("Error booking visit:", err);
      throw err;
    }
  };

  return (
    <PatientContext.Provider
      value={{
        visits,
        stats,
        fetchVisits,
        fetchDoctors,
        fetchAvailableSlots,
        bookVisit
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
