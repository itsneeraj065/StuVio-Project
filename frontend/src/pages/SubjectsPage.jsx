import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function SubjectsPage() {
  const navigate = useNavigate();
  const { semesterId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setError("");
      const response = await API.get(`/subjects/semester/${semesterId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError("Failed to load subjects. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.dashboardContainer}>
      

      {/* MAIN CONTENT WORKSPACE */}
      <main style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <div>
            <div style={styles.breadcrumbWrapper}>
              <span style={styles.breadcrumb} onClick={() => navigate("/courses")}>Courses</span>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumb} onClick={() => navigate(-1)}>Semesters</span>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbActive}>Subjects</span>
            </div>
            <h1 style={styles.pageTitle}>Semester Subjects</h1>
            <p style={styles.pageSubtitle}>Select a structural course subject to access dynamic online reference files.</p>
          </div>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}

        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={styles.skeletonCard}>
                <div style={styles.skeletonTitle}></div>
                <div style={styles.skeletonText}></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.grid}>
            {subjects.length === 0 && !error ? (
              <p style={styles.emptyStateText}>No active subject entries map to this specific structural term.</p>
            ) : (
              subjects.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => navigate(`/resources/${subject.id}`)}
                  onMouseEnter={() => setHoveredCardId(subject.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{...styles.card, ...(hoveredCardId === subject.id ? styles.cardHover : {})}}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.subjectBadge}>📖 Subject</div>
                    <span style={{...styles.arrowIcon, ...(hoveredCardId === subject.id ? styles.arrowIconHover : {})}}>→</span>
                  </div>
                  <h2 style={styles.subjectTitle}>{subject.subjectName}</h2>
<p style={styles.subjectCode}>{subject.subjectCode || "No Code Listed"}</p>
<p style={{ marginTop: "8px", fontSize: "13px", color: "#64748b" }}>
  {subject.description || "No description available"}
</p>
<p style={{ marginTop: "6px", fontSize: "13px", fontWeight: "600", color: "#334155" }}>
  Credits: {subject.credits}
</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Styling definitions shared with other dashboard page components
const commonStyles = {
  dashboardContainer: { display: "flex", height: "100vh", width: "100vw", backgroundColor: "#f8fafc", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', overflow: "hidden" },
  sidebar: { width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "24px 16px", display: "flex", flexDirection: "column", boxSizing: "border-box" },
  brandWrapper: { display: "flex", alignItems: "center", gap: "10px", paddingLeft: "8px", marginBottom: "32px" },
  logo: { height: "36px", width: "36px", objectFit: "cover", borderRadius: "50%" },
  brandName: { fontSize: "20px", fontWeight: "800", color: "#1e293b", letterSpacing: "-0.5px" },
  navMenu: { display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", color: "#64748b", cursor: "pointer", transition: "all 0.2s ease" },
  navItemActive: { backgroundColor: "#f1f5f9", color: "#2563eb" },
  navIcon: { color: "inherit" },
  logoutButton: { display: "flex", alignItems: "center", justifycenter: "center", gap: "10px", padding: "12px", backgroundColor: "#fef2f2", color: "#dc2626", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" },
  logoutButtonHover: { backgroundColor: "#fee2e2", transform: "translateY(-1px)" },
  mainContent: { flexGrow: 1, padding: "40px", overflowY: "auto", boxSizing: "border-box" },
  contentHeader: { marginBottom: "32px" },
  breadcrumbWrapper: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "13px", fontWeight: "600" },
  breadcrumb: { color: "#2563eb", cursor: "pointer" },
  breadcrumbSeparator: { color: "#94a3b8" },
  breadcrumbActive: { color: "#64748b" },
  pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px 0" },
  pageSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  errorBanner: { backgroundColor: "#fef2f2", color: "#dc2626", padding: "14px", borderRadius: "10px", fontSize: "14px", marginBottom: "24px", border: "1px solid #fee2e2", fontWeight: "500" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  emptyStateText: { color: "#64748b", fontSize: "14px" }
};

const styles = {
  ...commonStyles,
  card: { background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)", display: "flex", flexDirection: "column", minHeight: "140px" },
  cardHover: { transform: "translateY(-4px)", borderColor: "#2563eb", boxShadow: "0 12px 20px -8px rgba(37, 99, 235, 0.15)" },
  cardHeader: { display: "flex", justifycontent: "space-between", alignItems: "center", marginBottom: "16px" },
  subjectBadge: { backgroundColor: "#f1f5f9", color: "#475569", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  arrowIcon: { fontSize: "18px", color: "#94a3b8", transition: "all 0.2s ease" },
  arrowIconHover: { color: "#2563eb", transform: "translateX(3px)" },
  subjectTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px 0", lineHeight: "1.4" },
  subjectCode: { margin: 0, fontSize: "13px", color: "#64748b", fontWeight: "500" },
  skeletonCard: { background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1px solid #f1f5f9", minHeight: "140px" },
  skeletonTitle: { height: "22px", width: "70%", backgroundColor: "#f1f5f9", borderRadius: "6px", marginBottom: "16px" },
  skeletonText: { height: "16px", width: "40%", backgroundColor: "#f1f5f9", borderRadius: "6px" }
};

export default SubjectsPage;