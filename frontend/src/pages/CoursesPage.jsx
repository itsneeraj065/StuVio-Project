import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function CoursesPage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setError("");
      const response = await API.get("/course");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please check your network connection.");
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
            <div
              style={styles.breadcrumb}
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </div>
            <h1 style={styles.pageTitle}>Available Courses</h1>
            <p style={styles.pageSubtitle}>
              Select a structural path to view academic semesters and timeline syllabus data.
            </p>
          </div>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}

        {loading ? (
          <div style={styles.courseGrid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} style={styles.skeletonCard}>
                <div style={styles.skeletonTitle}></div>
                <div style={styles.skeletonText}></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.courseGrid}>
            {courses.length === 0 && !error ? (
              <p style={styles.emptyStateText}>
                No courses have been assigned to your profile yet.
              </p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/semesters/${course.id}`)}
                  onMouseEnter={() => setHoveredCardId(course.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    ...styles.card,
                    ...(hoveredCardId === course.id ? styles.cardHover : {})
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.courseBadge}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                      </svg>
                      {course.totalSemesters
                        ? `${course.totalSemesters} Sems`
                        : "COURSE"}
                    </div>

                    <span
                      style={{
                        ...styles.arrowIcon,
                        ...(hoveredCardId === course.id
                          ? styles.arrowIconHover
                          : {})
                      }}
                    >
                      →
                    </span>
                  </div>

                  <h2 style={styles.courseName}>{course.courseName}</h2>
                  <p style={styles.courseMeta}>
                    {course.description || "Click to access structural materials"}
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

const styles = {
  dashboardContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

  breadcrumb: {
    fontSize: "13px",
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
    display: "inline-block"
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

  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px"
  },

  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "140px"
  },

  cardHover: {
    transform: "translateY(-4px)",
    borderColor: "#2563eb",
    boxShadow: "0 12px 20px -8px rgba(37, 99, 235, 0.15)"
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },

  courseBadge: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  arrowIcon: {
    fontSize: "18px",
    color: "#94a3b8",
    transition: "all 0.2s ease"
  },

  arrowIconHover: {
    color: "#2563eb",
    transform: "translateX(3px)"
  },

  courseName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 6px 0",
    lineHeight: "1.4"
  },

  courseMeta: {
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
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #f1f5f9",
    minHeight: "140px",
    boxSizing: "border-box"
  },

  skeletonTitle: {
    height: "24px",
    width: "40%",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px",
    marginBottom: "24px"
  },

  skeletonText: {
    height: "20px",
    width: "85%",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px"
  }
};

export default CoursesPage;