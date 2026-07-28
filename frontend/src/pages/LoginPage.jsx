import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FaGoogle, FaGithub, FaLinkedin, FaRocket, FaUserShield } from "react-icons/fa";

function LoginPage() {
  const [isGuestMode, setIsGuestMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useApp();
  const navigate = useNavigate();

  // Instant Entry for Guest Users
  const handleGuestEntry = async () => {
    setLoading(true);
    try {
      if (login) await login("guest@stuvio.in", "guestpass");
      navigate("/portal/dashboard");
    } catch (err) {
      navigate("/portal/dashboard"); // Direct fallback route
    } finally {
      setLoading(false);
    }
  };

  // Standard Account Sync
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/portal/dashboard");
    } catch (err) {
      setError("Unauthorized credentials. Check your access keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* HEADER SECTION */}
        <div style={styles.header}>
          <img 
            src="/logo.png" 
            alt="StuVio Logo" 
            onClick={() => navigate("/")} 
            style={styles.logoImg} 
          />
          <h2 style={styles.title}>Workspace Gateway</h2>
          <p style={styles.subtitle}>
            {isGuestMode ? "Enter immediately without creating an account" : "Sync your personal academic account"}
          </p>
        </div>

        {/* MODE SWITCH TABS */}
        <div style={styles.tabContainer}>
          <button 
            style={{
              ...styles.tabBtn,
              backgroundColor: isGuestMode ? "#6366f1" : "transparent",
              color: isGuestMode ? "#ffffff" : "#94a3b8"
            }}
            onClick={() => setIsGuestMode(true)}
          >
            🚀 Instant Guest Access
          </button>
          <button 
            style={{
              ...styles.tabBtn,
              backgroundColor: !isGuestMode ? "#6366f1" : "transparent",
              color: !isGuestMode ? "#ffffff" : "#94a3b8"
            }}
            onClick={() => setIsGuestMode(false)}
          >
            🔐 Account Login
          </button>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {/* GUEST ACCESS MODE */}
        {isGuestMode ? (
          <div style={styles.guestWrapper}>
            <div style={styles.guestInfoCard}>
              <FaUserShield style={{ fontSize: "28px", color: "#6366f1", marginBottom: "8px" }} />
              <p style={styles.guestText}>
                Explore notes, syllabus tracking, and practice coding playgrounds instantly. No registration needed.
              </p>
            </div>

            <button onClick={handleGuestEntry} disabled={loading} style={styles.launchBtn}>
              <FaRocket style={{ marginRight: "8px" }} />
              {loading ? "Initializing Workspace..." : "Launch Workspace Portal"}
            </button>
          </div>
        ) : (
          /* STANDARD FORM MODE */
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Academic Email</label>
              <input
                type="email"
                required
                placeholder="student@stuvio.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Security Key</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Authenticating..." : "Establish Handshake"}
            </button>
          </form>
        )}

        {/* OAUTH SOCIAL QUICK-ACCESS */}
        <div style={styles.socialDivider}>
          <span style={styles.dividerText}>or continue with</span>
        </div>

        <div style={styles.socialGrid}>
          <button 
            style={styles.socialBtn}
            onClick={() => handleGuestEntry()}
          >
            <FaGoogle style={{ color: "#ea4335" }} /> Google
          </button>
          <button 
            style={styles.socialBtn}
            onClick={() => handleGuestEntry()}
          >
            <FaGithub style={{ color: "#ffffff" }} /> GitHub
          </button>
          <button 
            style={styles.socialBtn}
            onClick={() => handleGuestEntry()}
          >
            <FaLinkedin style={{ color: "#0a66c2" }} /> LinkedIn
          </button>
        </div>

        {/* BACK TO LANDING */}
        <p style={styles.backHome} onClick={() => navigate("/")}>
          ← Back to Public Landing Page
        </p>

      </div>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} StuVio. Constructed by Neeraj Singh Baghel.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0b0f19",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justify: "center",
    padding: "20px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "440px",
    padding: "36px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(12px)",
    marginTop: "auto",
    marginBottom: "auto"
  },
  header: { textAlign: "center", marginBottom: "24px" },
  logoImg: { height: "65px", width: "auto", cursor: "pointer", marginBottom: "12px" },
  title: { fontSize: "22px", fontWeight: "700", color: "#ffffff", margin: "0 0 6px 0" },
  subtitle: { fontSize: "13px", color: "#94a3b8", margin: 0 },
  
  tabContainer: {
    display: "flex",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    padding: "4px",
    borderRadius: "12px",
    marginBottom: "24px",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  },
  tabBtn: {
    flex: 1,
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  guestWrapper: { display: "flex", flexDirection: "column", gap: "16px" },
  guestInfoCard: {
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center"
  },
  guestText: { fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 },
  launchBtn: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease"
  },

  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" },
  input: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#ffffff",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none"
  },
  submitBtn: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px"
  },

  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "16px",
    textAlign: "center"
  },

  socialDivider: {
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    lineHeight: "0.1em",
    margin: "24px 0 16px 0"
  },
  dividerText: { backgroundColor: "#0b0f19", padding: "0 10px", color: "#64748b", fontSize: "11px", textTransform: "uppercase" },

  socialGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
  socialBtn: {
    backgroundColor: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    color: "#cbd5e1",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },

  backHome: { fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "24px", cursor: "pointer" },
  footer: { padding: "16px", color: "#475569", fontSize: "12px", textAlign: "center" }
};

export default LoginPage;