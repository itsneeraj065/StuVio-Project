import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";

// Components & Layout
import Sidebar from "./components/Sidebar";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import SemestersPage from "./pages/SemestersPage";
import SubjectsPage from "./pages/SubjectsPage";
import ResourcesPage from "./pages/ResourcesPage";
import VideosPage from "./pages/VideosPage";
import NotesPage from "./pages/NotesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import SchedulePage from "./pages/SchedulePage";
import CertificatesPage from "./pages/CertificatesPage";
import ProfilePage from "./pages/ProfilePage";
// Secure route guard to protect the Student Portal
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useApp();
  
  if (loading) {
    return (
      <div style={{ color: "#ffffff", padding: "40px", backgroundColor: "#0b0f19", minHeight: "100vh" }}>
        Initializing Portal Security...
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing & Login Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Student Portal Section (Note the "/*" wildcard added here) */}
        <Route 
          path="/portal/*" 
          element={
            <ProtectedRoute>
              <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b0f19" }}>
                {/* PERSISTENT SIDEBAR */}
                <Sidebar />
                
                {/* MAIN CONTENT AREA */}
                <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="courses" element={<MyCoursesPage />} />
                    {/* Redirect bare "/portal" directly to "/portal/dashboard" */}
                    <Route path="semesters" element={<SemestersPage />} />
                    <Route path="subjects" element={<SubjectsPage />} />
                    <Route path="resources" element={<ResourcesPage />} />
                    <Route path="videos" element={<VideosPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="assignments" element={<AssignmentsPage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="certificates" element={<CertificatesPage />} />
  <Route path="profile" element={<ProfilePage />} />
                    <Route path="" element={<Navigate to="dashboard" replace />} />
                    {/* Fallback for invalid sub-routes */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />

        {/* Global Catch-All Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;