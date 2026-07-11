import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function SemestersPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    fetchSemesters();
  }, [courseId]);

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/semester/course/${courseId}`);
      setSemesters(response.data || []);
    } catch (error) {
      console.error("Error fetching semesters:", error);
      setError("Failed to load semesters.");
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
    

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <div>
            <div style={styles.breadcrumbWrapper}>
              <span style={styles.breadcrumb} onClick={() => navigate("/courses")}>
                Courses
              </span>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbActive}>Semesters</span>
            </div>

            <h1 style={styles.pageTitle}>Academic Semesters</h1>
            <p style={styles.pageSubtitle}>
              Select a semester to view its subjects and learning resources.
            </p>
          </div>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}

        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={styles.skeletonCard}>
                <div style={styles.skeletonCircle}></div>
                <div style={styles.skeletonTitle}></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.grid}>
            {semesters.length === 0 ? (
              <p style={styles.emptyStateText}>No semesters found for this course.</p>
            ) : (
              semesters.map((semester) => (
                <div
                  key={semester.id}
                  onClick={() => navigate(`/subjects/${semester.id}`)}
                  onMouseEnter={() => setHoveredCardId(semester.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    ...styles.card,
                    ...(hoveredCardId === semester.id ? styles.cardHover : {})
                  }}
                >
                  <div
                    style={{
                      ...styles.iconWrapper,
                      ...(hoveredCardId === semester.id ? styles.iconWrapperHover : {})
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                      <path d="M6 6h10M6 10h10" />
                    </svg>
                  </div>

                  <h2 style={styles.semesterTitle}>
                    Semester {semester.semesterNumber}
                  </h2>
                  <p style={styles.semesterMeta}>Click to view subjects</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: "hidden"
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingLeft: "8px",
    marginBottom: "32px"
  },
  logo: {
    height: "36px",
    width: "36px",
    objectFit: "cover",
    borderRadius: "50%"
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: "-0.5px"
  },
  navMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  navItemActive: {
    backgroundColor: "#f1f5f9",
    color: "#2563eb"
  },
  navIcon: {
    color: "inherit"
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  logoutButtonHover: {
    backgroundColor: "#fee2e2",
    transform: "translateY(-1px)"
  },
  mainContent: {
    flexGrow: 1,
    padding: "40px",
    overflowY: "auto",
    boxSizing: "border-box"
  },
  contentHeader: {
    marginBottom: "32px"
  },
  breadcrumbWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "13px",
    fontWeight: "600"
  },
  breadcrumb: {
    color: "#2563eb",
    cursor: "pointer"
  },
  breadcrumbSeparator: {
    color: "#94a3b8"
  },
  breadcrumbActive: {
    color: "#64748b"
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 6px 0"
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0
  },
  errorBanner: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "14px",
    marginBottom: "24px",
    border: "1px solid #fee2e2",
    fontWeight: "500"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "24px"
  },
  card: {
    background: "#ffffff",
    padding: "32px 24px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cardHover: {
    transform: "translateY(-4px)",
    borderColor: "#2563eb",
    boxShadow: "0 12px 20px -8px rgba(37, 99, 235, 0.15)"
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    transition: "all 0.2s ease"
  },
  iconWrapperHover: {
    backgroundColor: "#eff6ff",
    color: "#2563eb"
  },
  semesterTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0"
  },
  semesterMeta: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b"
  },
  emptyStateText: {
    color: "#64748b",
    fontSize: "14px"
  },
  skeletonCard: {
    background: "#ffffff",
    padding: "32px 24px",
    borderRadius: "14px",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box"
  },
  skeletonCircle: {
    height: "48px",
    width: "48px",
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    marginBottom: "16px"
  },
  skeletonTitle: {
    height: "20px",
    width: "60%",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px"
  }
};

export default SemestersPage;