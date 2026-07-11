import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AssignmentsPage() {
  const navigate = useNavigate();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  // Dummy assignments for now
  const assignments = [
    {
      id: 1,
      title: "Java OOP Assignment",
      subject: "Core Java",
      dueDate: "2026-07-10",
      description: "Complete OOP concepts questions and submit PDF."
    },
    {
      id: 2,
      title: "DBMS ER Diagram Task",
      subject: "Database Management System",
      dueDate: "2026-07-12",
      description: "Design ER diagram for Student Management System."
    },
    {
      id: 3,
      title: "Operating System Notes Submission",
      subject: "Operating System",
      dueDate: "2026-07-15",
      description: "Prepare short notes on process scheduling algorithms."
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.dashboardContainer}>


      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <div style={styles.breadcrumbWrapper}>
            <span style={styles.breadcrumb} onClick={() => navigate("/dashboard")}>
              Dashboard
            </span>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumbActive}>Assignments</span>
          </div>

          <h1 style={styles.pageTitle}>Assignments</h1>
          <p style={styles.pageSubtitle}>
            View all assignments across your subjects.
          </p>
        </header>

        <div style={styles.assignmentGrid}>
          {assignments.map((assignment) => (
            <div key={assignment.id} style={styles.assignmentCard}>
              <div style={styles.assignmentTop}>
                <div style={styles.assignmentIcon}>📝</div>
                <div>
                  <h3 style={styles.assignmentTitle}>{assignment.title}</h3>
                  <p style={styles.assignmentSubject}>{assignment.subject}</p>
                </div>
              </div>

              <p style={styles.assignmentDescription}>{assignment.description}</p>

              <div style={styles.assignmentFooter}>
                <span style={styles.dueDate}>Due: {assignment.dueDate}</span>
                <button style={styles.viewButton}>View</button>
              </div>
            </div>
          ))}
        </div>
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
    backgroundColor: "#eff6ff",
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

  assignmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  assignmentCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  assignmentTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  assignmentIcon: {
    fontSize: "24px",
    backgroundColor: "#eff6ff",
    padding: "12px",
    borderRadius: "12px"
  },

  assignmentTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#1e293b"
  },

  assignmentSubject: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600"
  },

  assignmentDescription: {
    margin: 0,
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5"
  },

  assignmentFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto"
  },

  dueDate: {
    fontSize: "13px",
    color: "#dc2626",
    fontWeight: "700"
  },

  viewButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "9px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px"
  }
};

export default AssignmentsPage;