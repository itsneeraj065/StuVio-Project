import { useApp } from "../context/AppContext";

function ProfilePage() {
  const { user } = useApp();

  // Safeguard default state values in case user object is establishing link keys
  const profileUser = user || {
    name: "Neeraj",
    email: "student@stuvio.in",
    track: "Computer Science & Engineering"
  };

  return (
    <div style={styles.canvas}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Student Account Hub</h2>
        <p style={styles.subheading}>Manage your academic profile settings, core database keys, and account metrics.</p>
      </div>

      <div style={styles.card}>
        <div style={styles.profileSection}>
          <div style={styles.avatar}>💻</div>
          <div>
            <h3 style={styles.profileName}>{profileUser.name}</h3>
            <p style={styles.profileTrack}>{profileUser.track}</p>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <span style={styles.label}>Registered Email</span>
            <span style={styles.val}>{profileUser.email}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Enrollment ID</span>
            <span style={styles.val}>STU-2026-88401</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Academic Scheme</span>
            <span style={styles.val}>B.Tech (V Semester)</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Security System</span>
            <span style={styles.val}>Verified Account Tier</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  canvas: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#0b0f19",
    padding: "40px",
    borderRadius: "24px"
  },
  header: {
    marginBottom: "8px"
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, #ffffff, #cbd5e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subheading: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "32px"
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    paddingBottom: "24px"
  },
  avatar: {
    width: "70px",
    height: "70px",
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px"
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 4px 0"
  },
  profileTrack: {
    fontSize: "13px",
    color: "#818cf8",
    fontWeight: "600",
    margin: 0
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    "@media(max-width: 600px)": {
      gridTemplateColumns: "1fr"
    }
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "11px",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700"
  },
  val: {
    fontSize: "14px",
    color: "#cbd5e1",
    fontWeight: "600"
  }
};

export default ProfilePage;