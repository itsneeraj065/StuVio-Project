import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div
        onClick={() => navigate("/dashboard")}
        style={{ ...styles.brandWrapper, cursor: "pointer" }}
      >
        <img
          src="/logo.jpg"
          alt="StuVio Logo"
          style={styles.logo}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span style={styles.brandName}>StuVio</span>
      </div>

      {/* Main nav */}
      <nav style={styles.navMenu}>
        <div
          onClick={() => navigate("/dashboard")}
          style={{
            ...styles.navItem,
            ...(isActive("/dashboard") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>🏠</span>
          Dashboard
        </div>

        <div
          onClick={() => navigate("/courses")}
          style={{
            ...styles.navItem,
            ...(isActive("/courses") || isActive("/semesters") || isActive("/subjects") || isActive("/resources")
              ? styles.navItemActive
              : {})
          }}
        >
          <span style={styles.icon}>📚</span>
          My Courses
        </div>

        <div
          onClick={() => navigate("/assignments")}
          style={{
            ...styles.navItem,
            ...(isActive("/assignments") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>📝</span>
          Assignments
        </div>

        <div
          onClick={() => navigate("/notes")}
          style={{
            ...styles.navItem,
            ...(isActive("/notes") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>📘</span>
          Notes
        </div>

        <div
          onClick={() => navigate("/videos")}
          style={{
            ...styles.navItem,
            ...(isActive("/videos") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>🎥</span>
          Videos
        </div>

        <div
          onClick={() => navigate("/calendar")}
          style={{
            ...styles.navItem,
            ...(isActive("/calendar") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>📅</span>
          Calendar
        </div>

        <div
          onClick={() => navigate("/profile")}
          style={{
            ...styles.navItem,
            ...(isActive("/profile") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>👤</span>
          Profile
        </div>
      </nav>

      {/* Bottom section */}
      <div style={styles.bottomSection}>
        <div
          onClick={() => navigate("/settings")}
          style={{
            ...styles.navItem,
            ...(isActive("/settings") ? styles.navItemActive : {})
          }}
        >
          <span style={styles.icon}>⚙️</span>
          Settings
        </div>

        <button
          onClick={handleLogout}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{
            ...styles.logoutButton,
            ...(isLogoutHovered ? styles.logoutButtonHover : {})
          }}
        >
          <span style={styles.icon}>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    minWidth: "260px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    height: "100vh"
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingLeft: "8px",
    marginBottom: "32px"
  },
  logo: {
    height: "38px",
    width: "38px",
    objectFit: "cover",
    borderRadius: "50%"
  },
  brandName: {
    fontSize: "22px",
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
    borderRadius: "10px",
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
  icon: {
    fontSize: "16px",
    width: "20px",
    textAlign: "center"
  },
  bottomSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px"
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left"
  },
  logoutButtonHover: {
    backgroundColor: "#fee2e2"
  }
};

export default Sidebar;