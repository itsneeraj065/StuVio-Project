import { useState } from "react";

function CertificatesPage() {
  const [certs, setCerts] = useState([
    {
      id: 1,
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "March 2026",
      idCode: "AWS-ASA-99812",
      badge: "☁️",
      link: "#"
    },
    {
      id: 2,
      title: "Google Advanced Data Analytics Professional",
      issuer: "Google Career Certificates",
      date: "January 2026",
      idCode: "G-ANA-44120",
      badge: "📊",
      link: "#"
    },
    {
      id: 3,
      title: "PostgreSQL Database Administration Masterclass",
      issuer: "Udemy Academy",
      date: "November 2025",
      idCode: "UC-8812-DBA",
      badge: "🗄️",
      link: "#"
    }
  ]);

  return (
    <div style={styles.canvas}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Professional Credentials & Certificates</h2>
        <p style={styles.subheading}>Manage verified digital badges, cloud credentials, and curriculum honors.</p>
      </div>

      <div style={styles.grid}>
        {certs.map((cert) => (
          <div key={cert.id} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.badgeContainer}>{cert.badge}</div>
              <span style={styles.dateLabel}>{cert.date}</span>
            </div>

            <h3 style={styles.certTitle}>{cert.title}</h3>
            <p style={styles.issuerText}>{cert.issuer}</p>

            <div style={styles.metaRow}>
              <div>
                <span style={styles.metaLabel}>Credential ID</span>
                <span style={styles.metaVal}>{cert.idCode}</span>
              </div>
            </div>

            <a href={cert.link} style={styles.verifyBtn}>
              <span>Verify Secure Hash</span>
              <span>🔗</span>
            </a>
          </div>
        ))}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badgeContainer: {
    width: "44px",
    height: "44px",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },
  dateLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600"
  },
  certTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    lineHeight: "1.4"
  },
  issuerText: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0
  },
  metaRow: {
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
    paddingTop: "16px",
    marginTop: "4px"
  },
  metaLabel: {
    display: "block",
    fontSize: "10px",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700"
  },
  metaVal: {
    display: "block",
    fontSize: "13px",
    color: "#cbd5e1",
    fontWeight: "600",
    marginTop: "4px"
  },
  verifyBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#cbd5e1",
    fontSize: "12px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.2s"
  }
};

export default CertificatesPage;