import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Layout and interactive UI states
  const [isHovered, setIsHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(""); 
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeSocial, setActiveSocial] = useState("");
  const [activeTab, setActiveTab] = useState("updates"); // 'updates' or 'stats'
  const [logoIsPressed, setLogoIsPressed] = useState(false); // Glow trigger state

  // Pre-fill email if rememberMe was previously checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("stuvio_remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      
      if (rememberMe) {
        localStorage.setItem("stuvio_remembered_email", email);
      } else {
        localStorage.removeItem("stuvio_remembered_email");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Login authentication error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Background ambient accents */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div style={styles.splitContainer}>
        
        {/* LEFT COLUMN: THE LOGIN INTERFACE */}
        <div style={styles.leftPanel}>
          {/* BRANDING LOGO SEGMENT WITH GLOW INTERACTION */}
          <div style={styles.logoContainer}>
            {!logoFailed ? (
              <img 
                src="/logo.jpg" 
                alt="StuVio Logo" 
                style={{
                  ...styles.logoImg,
                  ...(logoIsPressed ? styles.logoGlowActive : {})
                }} 
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div style={{
                ...styles.logoFallback,
                ...(logoIsPressed ? styles.logoGlowActive : {})
              }}>SV</div>
            )}
            <h1 
              onMouseDown={() => setLogoIsPressed(true)}
              onMouseUp={() => setLogoIsPressed(false)}
              onMouseLeave={() => setLogoIsPressed(false)}
              style={{
                ...styles.brandTitle,
                ...(logoIsPressed ? styles.brandTitleGlowActive : {})
              }}
            >
              StuVio
            </h1>
            <p style={styles.brandSubtitle}>Your Unified Academic Resource Hub</p>
          </div>

          {/* ERROR BLOCK */}
          {error && (
            <div style={styles.errorBanner}>
              <svg style={{marginRight: '8px', flexShrink: 0}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={{...styles.inputWrapper, ...(focusedInput === "email" ? styles.inputWrapperFocused : {})}}>
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={focusedInput === "email" ? "#6366f1" : "#94a3b8"} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input 
                  type="email" 
                  placeholder="name@university.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput("")}
                  style={styles.input}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={{...styles.inputWrapper, ...(focusedInput === "password" ? styles.inputWrapperFocused : {})}}>
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={focusedInput === "password" ? "#6366f1" : "#94a3b8"} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput("")}
                  style={styles.input}
                  disabled={loading}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton} tabIndex="-1">
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.utilitiesRow}>
              <label style={styles.checkboxContainer}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={styles.hiddenCheckbox} />
                <div style={{...styles.customCheckbox, ...(rememberMe ? styles.customCheckboxChecked : {})}}>
                  {rememberMe && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </div>
                <span style={styles.checkboxLabel}>Remember me</span>
              </label>
              <span onClick={() => navigate("/forgot-password")} style={styles.forgotLink}>Forgot Password?</span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{...styles.submitButton, ...(isHovered ? styles.submitButtonHover : {}), ...(loading ? styles.submitButtonDisabled : {})}}
            >
              {loading ? <div style={styles.loaderContainer}><div style={styles.spinner}></div>Authenticating...</div> : "Sign In to Dashboard"}
            </button>
          </form>

          {/* CONNECT DIVIDER & ROW */}
          <div style={styles.socialDividerContainer}>
            <div style={styles.socialDividerLine}></div>
            <span style={styles.socialDividerText}>Connect with us</span>
            <div style={styles.socialDividerLine}></div>
          </div>

          <div style={styles.socialLinksRow}>
            {/* WhatsApp */}
            <a href="https://wa.me/7225847591" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setActiveSocial("whatsapp")} onMouseLeave={() => setActiveSocial("")} style={{...styles.socialIconCard, ...(activeSocial === "whatsapp" ? styles.whatsappHoverStyle : "")}} aria-label="WhatsApp">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.481 4.793 1.484 5.432-.002 9.854-4.39 9.856-9.782.002-2.612-1.01-5.067-2.852-6.912E-4-1.843-1.845-4.293-2.859-6.903-2.861-5.438 0-9.86 4.386-9.862 9.779-.001 1.77.472 3.42 1.365 4.908L1.879 21.944l4.768-1.25zM16.96 14.682c-.3-.15-1.774-.874-2.048-.973-.274-.1-.474-.15-.674.15-.2.3-.774.973-.95 1.174-.175.2-.35.225-.65.075-.3-.15-1.265-.466-2.41-1.485-.89-.793-1.492-1.773-1.667-2.073-.175-.3-.019-.461.13-.61l.449-.524c.15-.2.2-.35.3-.5.1-.15.05-.3-.025-.45-.075-.15-.674-1.622-.924-2.223-.244-.588-.493-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.274.3-1.049 1.023-1.049 2.495 0 1.472 1.074 2.896 1.224 3.096.15.2 2.115 3.228 5.124 4.53.715.31 1.273.495 1.708.633.718.228 1.369.196 1.884.119.574-.085 1.774-.724 2.023-1.422.25-.699.25-1.299.175-1.422-.075-.123-.275-.198-.574-.348z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/officialstuvio" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setActiveSocial("instagram")} onMouseLeave={() => setActiveSocial("")} style={{...styles.socialIconCard, ...(activeSocial === "instagram" ? styles.instagramHoverStyle : "")}} aria-label="Instagram">
              <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setActiveSocial("linkedin")} onMouseLeave={() => setActiveSocial("")} style={{...styles.socialIconCard, ...(activeSocial === "linkedin" ? styles.linkedinHoverStyle : "")}} aria-label="LinkedIn">
              <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: MODERN ANNOUNCEMENTS / STATS PANEL */}
        <div style={styles.rightPanel}>
          {/* Decorative Sub-overlay gradient */}
          <div style={styles.panelOverlay}></div>

          {/* Content Wrapper */}
          <div style={styles.panelContent}>
            {/* Section Header Controls */}
            <div style={styles.panelNav}>
              <button 
                onClick={() => setActiveTab("updates")}
                style={{...styles.navTab, ...(activeTab === "updates" ? styles.navTabActive : {})}}
              >
                Campus Bulletins
              </button>
              <button 
                onClick={() => setActiveTab("stats")}
                style={{...styles.navTab, ...(activeTab === "stats" ? styles.navTabActive : {})}}
              >
                Hub Performance
              </button>
            </div>

            {/* TAB CONTENT: BULLETINS */}
            {activeTab === "updates" && (
              <div style={styles.tabBody}>
                <h3 style={styles.panelSectionTitle}>Live Academic Updates</h3>
                <div style={styles.bulletinList}>
                  <div style={styles.bulletinCard}>
                    <div style={styles.bulletinTagIndigo}>EXAMS</div>
                    <p style={styles.bulletinText}>End-semester registration lines open tonight at 12:00 AM. Ensure clear portal clearance.</p>
                    <span style={styles.bulletinTime}>Just now</span>
                  </div>
                  <div style={styles.bulletinCard}>
                    <div style={styles.bulletinTagCyan}>SYSTEM</div>
                    <p style={styles.bulletinText}>StuVio Cloud Database maintenance successfully closed. All digital asset endpoints fully operative.</p>
                    <span style={styles.bulletinTime}>2 hours ago</span>
                  </div>
                  <div style={styles.bulletinCard}>
                    <div style={styles.bulletinTagPurple}>RESOURCE</div>
                    <p style={styles.bulletinText}>Over 450+ missing reference archives injected into the Engineering and Applied Arts tracks.</p>
                    <span style={styles.bulletinTime}>Yesterday</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: METRICS & STATS */}
            {activeTab === "stats" && (
              <div style={styles.tabBody}>
                <h3 style={styles.panelSectionTitle}>Platform Integration Data</h3>
                <p style={styles.panelSectionDesc}>StuVio connects students and departments in real-time metrics across networks.</p>
                
                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <span style={styles.statNumber}>14K+</span>
                    <span style={styles.statLabel}>Active Scholars</span>
                  </div>
                  <div style={styles.statBox}>
                    <span style={styles.statNumber}>98.4%</span>
                    <span style={styles.statLabel}>Sync Efficiency</span>
                  </div>
                  <div style={styles.statBox}>
                    <span style={styles.statNumber}>1.2TB</span>
                    <span style={styles.statLabel}>Shared Material</span>
                  </div>
                  <div style={styles.statBox}>
                    <span style={styles.statNumber}>&lt; 40ms</span>
                    <span style={styles.statLabel}>Query Latency</span>
                  </div>
                </div>

                <div style={styles.quoteBlock}>
                  <p style={styles.quoteText}>"The ultimate university workflow optimization stack. Everything you require, instantly matched to your class profile."</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FOOTER CREDIT */}
      <footer style={styles.footer}>
        Made with <span style={{color: '#ef4444', margin: '0 4px'}}>❤️</span> by Neeraj Singh Baghel
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#0f172a", 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
    padding: "24px", 
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden"
  },

  blob1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    top: "-200px",
    left: "-100px",
    background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(0,0,0,0) 70%)", 
    zIndex: 1,
  },
  blob2: {
    position: "absolute",
    width: "700px",
    height: "700px",
    bottom: "-250px",
    right: "-100px",
    background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0) 70%)", 
    zIndex: 1,
  },

  /* SPLIT LAYOUT CARRIER GRID */
  splitContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    backgroundColor: "rgba(30, 41, 59, 0.4)", 
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "28px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxWidth: "960px", 
    minHeight: "580px",
    boxSizing: "border-box",
    zIndex: 2,
    overflow: "hidden",
    "@media (minWidth: 840px)": {
      gridTemplateColumns: "1fr 1fr"
    }
  },

  /* LEFT SIDE: INPUT MODULE */
  leftPanel: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  /* RIGHT SIDE: GLASS ANNOUNCEMENT PANEL */
  rightPanel: {
    display: "none", 
    position: "relative",
    background: "linear-gradient(145deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
    boxSizing: "border-box",
    padding: "40px",
    "@media (minWidth: 840px)": {
      display: "flex",
      flexDirection: "column",
    }
  },

  panelOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
    pointerEvents: "none"
  },

  panelContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },

  panelNav: {
    display: "flex",
    gap: "6px",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    padding: "4px",
    borderRadius: "10px",
    marginBottom: "28px",
    alignSelf: "flex-start",
    border: "1px solid rgba(255,255,255,0.04)"
  },

  navTab: {
    background: "none",
    border: "none",
    color: "#64748b",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  navTabActive: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
  },

  panelSectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 16px 0",
    letterSpacing: "-0.2px"
  },

  panelSectionDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0 0 24px 0",
    lineHeight: "1.5"
  },

  /* LIVE ANNOUNCEMENTS CARDS */
  bulletinList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  bulletinCard: {
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "14px",
    padding: "16px",
    transition: "transform 0.2s ease"
  },

  bulletinTagIndigo: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8",
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    padding: "3px 8px",
    borderRadius: "6px",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  },

  bulletinTagCyan: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#22d3ee",
    backgroundColor: "rgba(34, 211, 238, 0.15)",
    padding: "3px 8px",
    borderRadius: "6px",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  },

  bulletinTagPurple: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#c084fc",
    backgroundColor: "rgba(192, 132, 252, 0.15)",
    padding: "3px 8px",
    borderRadius: "6px",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  },

  bulletinText: {
    fontSize: "13px",
    color: "#cbd5e1",
    margin: "0 0 8px 0",
    lineHeight: "1.45"
  },

  bulletinTime: {
    fontSize: "11px",
    color: "#475569"
  },

  /* PERFORMANCE METRICS SCHEME */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "24px"
  },

  statBox: {
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    padding: "18px 14px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  statNumber: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#ffffff",
    background: "linear-gradient(to right, #ffffff, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500"
  },

  quoteBlock: {
    borderLeft: "2px solid #4f46e5",
    paddingLeft: "14px",
    marginTop: "auto"
  },

  quoteText: {
    fontSize: "13px",
    color: "#94a3b8",
    fontStyle: "italic",
    lineHeight: "1.5",
    margin: 0
  },

  /* BRANDING TEXT AND ANIMATION CONTROLS */
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "28px",
  },

  logoImg: {
    height: "64px",
    width: "64px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "14px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
  },

  logoFallback: {
    height: "64px",
    width: "64px",
    borderRadius: "16px",
    marginBottom: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)", 
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "800",
    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
  },

  brandTitle: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, #ffffff, #cbd5e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none"
  },

  brandTitleGlowActive: {
    transform: "scale(0.97)",
    /* Keeps the neat white/silver gradient text structure while casting the glow behind the characters */
    WebkitBackgroundClip: "text", 
    WebkitTextFillColor: "transparent",
    /* Uses standard drop-shadow filter so the neon aura wraps perfectly around the letter vectors */
    filter: "drop-shadow(0 0 6px #4f46e5) drop-shadow(0 0 15px #6366f1)"
  },

  logoGlowActive: {
    transform: "scale(0.95)",
    boxShadow: "0 0 15px #4f46e5, 0 0 30px rgba(99, 102, 241, 0.7)",
    borderColor: "#6366f1"
  },

  brandSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    fontWeight: "500",
  },

  errorBanner: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#fca5a5",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    marginBottom: "20px",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    display: "flex",
    alignItems: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "0 14px",
    transition: "all 0.2s ease",
  },

  inputWrapperFocused: {
    borderColor: "#6366f1", 
    boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)",
    backgroundColor: "rgba(15, 23, 42, 0.7)",
  },

  inputIcon: {
    marginRight: "10px",
    flexShrink: 0,
  },

  input: {
    width: "100%",
    padding: "13px 0",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "14px",
    color: "#ffffff",
    outline: "none",
  },

  eyeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    outline: "none",
  },

  utilitiesRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },

  hiddenCheckbox: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },

  customCheckbox: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    marginRight: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease"
  },

  customCheckboxChecked: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },

  checkboxLabel: {
    color: "#94a3b8",
    fontWeight: "500"
  },

  forgotLink: {
    color: "#6366f1",
    fontWeight: "600",
    cursor: "pointer",
  },

  submitButton: {
    background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
  },

  submitButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.35)",
  },

  submitButtonDisabled: {
    background: "rgba(255, 255, 255, 0.06)",
    color: "#64748b",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none"
  },

  socialDividerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0 16px 0",
    gap: "12px"
  },

  socialDividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.06)"
  },

  socialDividerText: {
    fontSize: "11px",
    color: "#475569",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  socialLinksRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px"
  },

  socialIconCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  whatsappHoverStyle: {
    color: "#25D366",
    borderColor: "rgba(37, 211, 102, 0.2)",
    backgroundColor: "rgba(37, 211, 102, 0.05)",
    transform: "translateY(-1px)"
  },

  instagramHoverStyle: {
    color: "#E1306C",
    borderColor: "rgba(225, 48, 108, 0.2)",
    backgroundColor: "rgba(225, 48, 108, 0.05)",
    transform: "translateY(-1px)"
  },

  linkedinHoverStyle: {
    color: "#0077B5",
    borderColor: "rgba(0, 119, 181, 0.2)",
    backgroundColor: "rgba(0, 119, 181, 0.05)",
    transform: "translateY(-1px)"
  },

  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },

  spinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },

 footer: {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    color: "#475569",
    fontWeight: "500",
    textAlign: "center",
    zIndex: 10,
    backgroundColor: "rgba(15, 23, 42, 0.6)", 
    padding: "6px 16px",
    borderRadius: "20px",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.03)",
    pointerEvents: "none" 
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.id = "stuvio-split-responsive-rules";
  if (!document.getElementById(styleSheet.id)) {
    styleSheet.innerText = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @media (minWidth: 840px) {
        div[style*="splitTemplateFallback"], #root div:has(> div[style*="leftPanel"]) {
          grid-template-columns: 1fr 1fr !important;
        }
        div:has(> div[style*="panelOverlay"]) {
          display: flex !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

export default LoginPage;