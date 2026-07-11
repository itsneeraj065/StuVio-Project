import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Active tab inferred directly from URL path
  const currentPath = location.pathname.replace("/", "") || "dashboard";

  // GLOBAL DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getStyle = (lightStyle, darkStyle) => {
    return isDarkMode ? { ...lightStyle, ...darkStyle } : lightStyle;
  };

  // Helper to determine if menu tab is active
  const isActive = (tabName) => currentPath === tabName;

  return (
    <div style={{ ...styles.dashboardContainer, ...(isDarkMode ? styles.darkDashboardContainer : {}) }}>
      
      {/* GLOBAL SIDEBAR NAVIGATION */}
      <aside style={{ ...styles.sidebar, ...(isDarkMode ? styles.darkSidebar : {}) }}>
        <div onClick={() => navigate("/dashboard")} style={{ ...styles.brandWrapper, cursor: "pointer" }}>
          <img src="/logo.jpg" alt="StuVio Logo" style={styles.logo} onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{ ...styles.brandName, ...(isDarkMode ? styles.darkTextMain : {}) }}>StuVio</span>
        </div>

        <nav style={styles.navMenu}>
          {/* OVERVIEW */}
          <div onClick={() => navigate("/dashboard")} style={{ ...styles.navItem, ...(isActive("dashboard") ? (isDarkMode ? styles.darkNavItemActive : styles.navItemActive) : {}), ...(isDarkMode && !isActive("dashboard") ? { color: "#94a3b8" } : {}) }}>
            Overview
          </div>

          {/* MY COURSES */}
          <div onClick={() => navigate("/courses")} style={{ ...styles.navItem, ...(isActive("courses") ? (isDarkMode ? styles.darkNavItemActive : styles.navItemActive) : {}), ...(isDarkMode && !isActive("courses") ? { color: "#94a3b8" } : {}) }}>
            My Courses
          </div>

          {/* ASSIGNMENTS */}
          <div onClick={() => navigate("/assignments")} style={{ ...styles.navItem, ...(isActive("assignments") ? (isDarkMode ? styles.darkNavItemActive : styles.navItemActive) : {}), ...(isDarkMode && !isActive("assignments") ? { color: "#94a3b8" } : {}) }}>
            Assignments
          </div>
          
          {/* Add your remaining nav items (Videos, Notes, etc.) exactly like above */}
        </nav>

        <button onClick={handleLogout} onMouseEnter={() => setIsLogoutHovered(true)} onMouseLeave={() => setIsLogoutHovered(false)} style={{ ...styles.logoutButton, ...(isLogoutHovered ? styles.logoutButtonHover : {}), ...(isDarkMode ? styles.darkLogoutButton : {}) }}>
          Logout
        </button>
      </aside>

      {/* GLOBAL SCROLLABLE WRAPPER */}
      <main style={styles.mainContent}>
        {/* GLOBAL HEADER */}
        <header style={styles.contentHeader}>
          <div>
            <h1 style={getStyle(styles.welcomeTitle, styles.darkTextMain)}>
              {isActive("dashboard") && "Welcome Back 👋"}
              {isActive("courses") && "My Courses 📘"}
              {isActive("assignments") && "Assignments 📝"}
            </h1>
            <p style={getStyle(styles.welcomeSubtitle, styles.darkTextSecondary)}>StuVio Platform</p>
          </div>
          
          <div style={styles.headerRightGroup}>
            {/* Global Search */}
            <div style={getStyle(styles.searchContainer, styles.darkSearchContainer)}>
              <input 
                type="text" 
                placeholder="Search globally..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={getStyle(styles.searchInput, styles.darkSearchInput)} 
              />
            </div>

            {/* Global Theme Button */}
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={getStyle(styles.themeToggleBtn, styles.darkThemeToggleBtn)}>
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <div style={styles.avatarPlaceholder}>S</div>
          </div>
        </header>

        {/* ACTIVE PAGE INJECTS HERE AND RETAINS ACCESS TO THEME VIA ROUTER CONTEXT */}
        <Outlet context={[isDarkMode, styles]} />
      </main>
    </div>
  );
}

// Keep all the exact same styles object properties down here
const styles = { /* ... Copy identical styling objects from dashboard code here ... */ };

export default MainLayout;