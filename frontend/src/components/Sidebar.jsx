import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useApp();

  const navItems = [
    { name: "Dashboard", path: "dashboard", icon: "📊" },
    { name: "My Courses", path: "courses", icon: "📚" },
    { name: "Semesters", path: "semesters", icon: "⏳" },
    { name: "Subjects", path: "subjects", icon: "🔬" },
    { name: "Resources", path: "resources", icon: "📁" },
    { name: "Videos", path: "videos", icon: "🎥" },
    { name: "Notes", path: "notes", icon: "📝" },
    { name: "Assignments", path: "assignments", icon: "📄" },
    { name: "Schedule", path: "schedule", icon: "📅" },
    { name: "Certificates", path: "certificates", icon: "🏆" },
    { name: "Profile", path: "profile", icon: "👤" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.sidebarLogoContainer}>
    <img src="/logo.png" alt="StuVio Logo" style={styles.sidebarLogo} />
    <span style={styles.sidebarTitle}>StuVio</span>
  </div>

        {user && (
          <div style={styles.profileBox}>
            <div style={styles.profileAvatar}>
              {user.name ? user.name.charAt(0) : "S"}
            </div>
            <div>
              <div style={styles.userName}>{user.name || "Student"}</div>
              <div style={styles.userRole}>{user.track || "Undergraduate"}</div>
            </div>
          </div>
        )}

        <nav style={styles.navStack}>
          {navItems.map((item) => {
            const isActive = location.pathname.endsWith(item.path);
            return (
              <div
                key={item.path}
                onClick={() => navigate(`/portal/${item.path}`)}
                style={{
                  ...styles.navLink,
                  backgroundColor: isActive ? "rgba(99, 102, 241, 0.1)" : "transparent",
                  color: isActive ? "#818cf8" : "#94a3b8"
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <button onClick={logout} style={styles.logoutBtn}>
        🚪 System Logout
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    backgroundColor: "#0b0f19",
    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "20px"
  },
  sidebarLogoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px", // Breathing room before the nav links
    padding: "10px"
  },
  sidebarLogo: {
    height: "32px", // Smaller than the login page logo for a sidebar fit
    width: "auto"
  },
  sidebarTitle: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  logoRow: {
    padding: "0 12px 24px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.5px"
  },
  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "12px",
    margin: "16px 0 24px 0",
    border: "1px solid rgba(255, 255, 255, 0.04)"
  },
  profileAvatar: {
    width: "36px",
    height: "36px",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px"
  },
  userName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff"
  },
  userRole: {
    fontSize: "11px",
    color: "#64748b",
    marginTop: "2px"
  },
  navStack: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  navIcon: {
    fontSize: "16px"
  },
  logoutBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    color: "#f87171",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s"
  }
};

export default Sidebar;