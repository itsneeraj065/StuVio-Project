import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import SemestersPage from "./pages/SemestersPage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectResourcesPage from "./pages/SubjectResourcesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import NotesPage from "./pages/NotesPage";
import VideosPage from "./pages/VideosPage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import SchedulePage from "./pages/SchedulePage";
import CertificatesPage from "./pages/CertificatesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentLayout from "./components/StudentLayout";

function App() {
  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background-color: #f8fafc;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<LoginPage />} />

          {/* PROTECTED + SHARED LAYOUT */}
          <Route
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/semesters/:courseId" element={<SemestersPage />} />
            <Route path="/subjects/:semesterId" element={<SubjectsPage />} />
            <Route path="/resources/:subjectId" element={<SubjectResourcesPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        <footer style={globalFooterStyle}>
          Made with <span style={{ color: "#ef4444", margin: "0 4px" }}>❤️</span> by Neeraj Singh Baghel
        </footer>
      </BrowserRouter>
    </>
  );
}

const globalFooterStyle = {
  position: "fixed",
  bottom: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "12px",
  color: "#475569",
  fontWeight: "500",
  textAlign: "center",
  zIndex: 9999,
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  padding: "6px 16px",
  borderRadius: "20px",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.03)",
  pointerEvents: "none"
};

export default App;