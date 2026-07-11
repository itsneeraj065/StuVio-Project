import { useNavigate } from "react-router-dom";
import { useState } from "react";

function VideosPage() {
  const navigate = useNavigate();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  // Dummy video lectures matching your subjects structure
  const videos = [
    {
      id: 1,
      title: "Introduction to Object-Oriented Programming",
      subject: "Core Java",
      duration: "45:20",
      description: "Learn the foundational pillars of OOP: Abstraction, Encapsulation, Inheritance, and Polymorphism."
    },
    {
      id: 2,
      title: "Normalizations in DBMS: 1NF, 2NF, and 3NF",
      subject: "Database Management System",
      duration: "32:15",
      description: "A deep dive into database normalization techniques with real-world table design examples."
    },
    {
      id: 3,
      title: "Understanding CPU Scheduling Algorithms",
      subject: "Operating System",
      duration: "58:40",
      description: "Comprehensive breakdown of FCFS, Shortest Job First (SJF), and Round Robin scheduling mechanics."
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
            <span style={styles.breadcrumbActive}>Videos</span>
          </div>

          <h1 style={styles.pageTitle}>Video Lectures</h1>
          <p style={styles.pageSubtitle}>
            Watch and review educational video lectures across your courses.
          </p>
        </header>

        <div style={styles.videoGrid}>
          {videos.map((video) => (
            <div key={video.id} style={styles.videoCard}>
              <div style={styles.videoTop}>
                <div style={styles.videoIcon}>📺</div>
                <div>
                  <h3 style={styles.videoTitle}>{video.title}</h3>
                  <p style={styles.videoSubject}>{video.subject}</p>
                </div>
              </div>

              <p style={styles.videoDescription}>{video.description}</p>

              <div style={styles.videoFooter}>
                <span style={styles.durationText}>Duration: {video.duration}</span>
                <button style={styles.playButton}>Play Video</button>
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

  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  videoCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  videoTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  videoIcon: {
    fontSize: "24px",
    backgroundColor: "#eff6ff",
    padding: "12px",
    borderRadius: "12px"
  },

  videoTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#1e293b"
  },

  videoSubject: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600"
  },

  videoDescription: {
    margin: 0,
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5"
  },

  videoFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto"
  },

  durationText: {
    fontSize: "13px",
    color: "#2563eb",
    fontWeight: "700"
  },

  playButton: {
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

export default VideosPage;