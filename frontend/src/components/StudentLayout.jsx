import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;
  const isCoursesSectionActive = () =>
    location.pathname === "/courses" ||
    location.pathname.startsWith("/semesters/") ||
    location.pathname.startsWith("/subjects/") ||
    location.pathname.startsWith("/resources/");

  return (
    <div style={styles.layout}>
      {/* SIDEBAR OR TOGGLE BUTTON */}
      {showSidebar ? (
        <aside style={styles.sidebar}>
          <button onClick={() => setShowSidebar(false)} style={styles.toggleBtn}>✕</button>
          
          <div onClick={() => navigate("/dashboard")} style={styles.brandWrapper}>
            <img src="/logo.jpg" alt="StuVio Logo" style={styles.logo} onError={(e) => e.target.style.display = "none"} />
            <span style={styles.brandName}>StuVio</span>
          </div>

          <nav style={styles.navMenu}>
             <SidebarItem label="Dashboard" active={isActive("/dashboard")} onClick={() => navigate("/dashboard")} icon="🏠" />
             <SidebarItem label="My Courses" active={isCoursesSectionActive()} onClick={() => navigate("/courses")} icon="📚" />
             <SidebarItem label="Assignments" active={isActive("/assignments")} onClick={() => navigate("/assignments")} icon="📝" />
             <SidebarItem label="Videos" active={isActive("/videos")} onClick={() => navigate("/videos")} icon="🎥" />
             <SidebarItem label="Notes" active={isActive("/notes")} onClick={() => navigate("/notes")} icon="📘" />
             <SidebarItem label="Community" active={isActive("/community")} onClick={() => navigate("/community")} icon="🌐" />
             <SidebarItem label="Profile" active={isActive("/profile")} onClick={() => navigate("/profile")} icon="👤" />
          </nav>

          <div style={styles.bottomArea}>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
        </aside>
      ) : (
        <button onClick={() => setShowSidebar(true)} style={styles.menuIcon}>☰</button>
      )}

      <main style={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

// SidebarItem Component
function SidebarItem({ label, icon, active, onClick }) {
  return (
    <div onClick={onClick} style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}>
      <span style={styles.navIcon}>{icon}</span>
      {label}
    </div>
  );
}

const styles = {
  layout: { display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "#f8fafc" },
  sidebar: { width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "24px 16px", display: "flex", flexDirection: "column", height: "100vh" },
  menuIcon: { position: "fixed", top: "20px", left: "20px", zIndex: 100, border: "none", background: "#fff", padding: "10px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  toggleBtn: { alignSelf: "flex-end", cursor: "pointer", background: "none", border: "none", fontSize: "16px", marginBottom: "10px" },
  brandWrapper: { display: "flex", alignItems: "center", gap: "10px", paddingLeft: "8px", marginBottom: "32px", cursor: "pointer" },
  logo: { height: "36px", width: "36px", borderRadius: "50%" },
  brandName: { fontSize: "20px", fontWeight: "800", color: "#1e293b" },
  navMenu: { display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", color: "#64748b", cursor: "pointer" },
  navItemActive: { backgroundColor: "#eff6ff", color: "#2563eb" },
  navIcon: { width: "20px", textAlign: "center" },
  bottomArea: { marginTop: "16px" },
  logoutButton: { width: "100%", padding: "12px", backgroundColor: "#fef2f2", color: "#dc2626", border: "none", borderRadius: "10px", cursor: "pointer" },
  mainContent: { flex: 1, padding: "32px" }
};

export default StudentLayout;