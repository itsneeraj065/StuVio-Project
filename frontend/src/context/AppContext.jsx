import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock global tasks for the dashboard pipeline until databases are synced
  const [globalTasks, setGlobalTasks] = useState([
    { id: 1, title: "Optimize Operating Systems Lab Report", course: "Advanced Operating Systems", deadline: "Today by 11:59 PM", daysLeft: 0, status: "Pending" },
    { id: 2, title: "Implement Red-Black Tree Visualizer", course: "Design & Analysis of Algorithms", deadline: "In 2 days", daysLeft: 2, status: "Pending" },
    { id: 3, title: "Submit Cryptography Problem Set 3", course: "Network Security", deadline: "In 5 days", daysLeft: 5, status: "Pending" },
  ]);

  // Check for existing session tokens on initial startup
  useEffect(() => {
    const token = localStorage.getItem("stuvio_token");
    if (token) {
      // For now, simulate recovery of an existing secure session token
      setIsAuthenticated(true);
      setUser({
        name: "Neeraj",
        email: "student@stuvio.in",
        track: "Computer Science & Engineering"
      });
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (email, password) => {
    // Simulated backend network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Super simple check for local testing layout purposes
        if (email && password) {
          const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
          localStorage.setItem("stuvio_token", mockToken);
          
          setUser({
            name: "Neeraj",
            email: email,
            track: "Computer Science & Engineering"
          });
          setIsAuthenticated(true);
          resolve(true);
        } else {
          reject(new Error("Invalid submission keys"));
        }
      }, 1000);
    });
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("stuvio_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      globalTasks,
      login,
      logout,
      setGlobalTasks
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside an AppProvider enclosure");
  }
  return context;
}