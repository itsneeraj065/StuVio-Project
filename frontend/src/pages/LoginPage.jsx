import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/portal/dashboard");
    } catch (err) {
      setError("Unauthorized credentials. Please check your system keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img 
            src="/logo.png" 
            alt="StuVio Logo" 
            onClick={() => navigate("/")} 
            style={styles.logoImg} 
          />
          <p style={styles.subtitle}>Enter workspace access credentials</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Academic Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g., student@stuvio.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Password</label>
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
            {loading ? "Authenticating Session..." : "Establish Secure Handshake"}
          </button>
        </form>

        {/* UPDATED: Added Auth Navigation Options */}
        <div style={styles.authOptions}>
          <span style={styles.link} onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
          <div style={styles.userActions}>
            <span style={styles.link} onClick={() => navigate("/register")}>New User</span>
            <span style={styles.divider}>|</span>
            <span style={styles.link} onClick={() => navigate("/login")}>Existing User</span>
          </div>
        </div>
       <p style={styles.backHome} onClick={() => navigate("/")}>
          ← Back to Public System Interface
        </p>
           {/* Social Media Login Icons */}
<div style={styles.socialContainer}>
<div 
    style={styles.socialIcon} 
    onClick={() => console.log("Google Login")}
    onMouseEnter={(e) => {
      // Primary glow color (e.g., #6366f1)
      e.target.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.6)";
      e.target.style.borderColor = "rgba(99, 102, 241, 0.4)";
      e.target.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      // Normal state (clear glow)
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      e.target.style.color = "#94a3b8";
    }}
  >
    Google
  </div> 
<div 
    style={styles.socialIcon} 
    onClick={() => console.log("LinkedIn Login")}
    onMouseEnter={(e) => {
      // Primary glow color (e.g., #6366f1)
      e.target.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.6)";
      e.target.style.borderColor = "rgba(99, 102, 241, 0.4)";
      e.target.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      // Normal state (clear glow)
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      e.target.style.color = "#94a3b8";
    }}
  >
    LinkedIn
  </div> 
<div 
    style={styles.socialIcon} 
    onClick={() => console.log("GitHub Login")}
    onMouseEnter={(e) => {
      // Primary glow color (e.g., #6366f1)
      e.target.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.6)";
      e.target.style.borderColor = "rgba(99, 102, 241, 0.4)";
      e.target.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      // Normal state (clear glow)
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      e.target.style.color = "#94a3b8";
    }}
  >
    GitHub
  </div> 
  </div>
  
  
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
    justifyContent: "center",
    padding: "20px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    marginTop: "auto",
    marginBottom: "auto"
  },
  // New Styles
  authOptions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px"
  },
  userActions: {
    display: "flex",
    gap: "10px",
    fontSize: "13px"
  },
  link: {
    color: "#6366f1",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "underline"
  },
  divider: { color: "#475569" },
  // Existing Styles
  footer: { padding: "20px", color: "#475569", fontSize: "12px", textAlign: "center", width: "100%" },
  header: { textAlign: "center", marginBottom: "32px" },
  logoImg: { height: "80px", width: "auto", cursor: "pointer", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#64748b", fontWeight: "500" },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "20px",
    textAlign: "center"
  },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" },
  input: { backgroundColor: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", color: "#ffffff", padding: "12px 16px", fontSize: "14px", outline: "none" },
  submitBtn: { backgroundColor: "#6366f1", color: "#ffffff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  backHome: { fontSize: "13px", color: "#64748b", textAlign: "center", marginTop: "24px", cursor: "pointer" } ,
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)"
  },
  socialIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s"
  }
};

export default LoginPage;