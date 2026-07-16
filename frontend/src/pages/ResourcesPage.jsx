import { useState } from "react";

function ResourcesPage() {
  const [filterSubject, setFilterSubject] = useState("All");

  const resourcesData = [
    { id: 1, title: "Kernel Process Management Slides", type: "PDF Document", size: "4.2 MB", subject: "CS-402", category: "Lectures", downloadUrl: "#" },
    { id: 2, title: "Distributed Systems Mutual Exclusion Guide", type: "Markdown Note", size: "18 KB", subject: "CS-402", category: "Handouts", downloadUrl: "#" },
    { id: 3, title: "Dynamic Programming Classic Problems & Solutions", type: "ZIP Archive", size: "12.5 MB", subject: "CS-406", category: "Code Repository", downloadUrl: "#" },
    { id: 4, title: "2025 Mid-Semester Algorithms Question Bank", type: "PDF Document", size: "1.1 MB", subject: "CS-406", category: "Exams", downloadUrl: "#" },
    { id: 5, title: "RSA Cryptosystem Mathematical Breakdown", type: "PDF Document", size: "2.8 MB", subject: "CS-408", category: "Lectures", downloadUrl: "#" },
    { id: 6, title: "Wireshark Packet Analysis Lab Cheat Sheet", type: "PDF Document", size: "940 KB", subject: "CS-408", category: "Handouts", downloadUrl: "#" }
  ];

  const subjects = ["All", "CS-402", "CS-406", "CS-408"];

  const filteredResources = filterSubject === "All" 
    ? resourcesData 
    : resourcesData.filter(res => res.subject === filterSubject);

  const getIcon = (type) => {
    switch(type) {
      case "PDF Document": return "📄";
      case "ZIP Archive": return "📦";
      case "Markdown Note": return "📝";
      default: return "📂";
    }
  };

  return (
    <div style={styles.canvas}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Academic Vault & Resources</h2>
          <p style={styles.subheading}>Access synchronized lecture media, structural handouts, and code repositories.</p>
        </div>

        {/* Filter controls */}
        <div style={styles.filterBar}>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              style={{
                ...styles.filterBtn,
                ...(filterSubject === sub ? styles.activeFilter : {})
              }}
            >
              {sub === "All" ? "Show All Modules" : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Layout */}
      <div style={styles.grid}>
        {filteredResources.map((res) => (
          <div key={res.id} style={styles.resourceCard}>
            <div style={styles.cardTop}>
              <div style={styles.iconContainer}>
                <span style={styles.iconSpair}>{getIcon(res.type)}</span>
              </div>
              <span style={styles.catBadge}>{res.category}</span>
            </div>

            <h3 style={styles.resourceTitle}>{res.title}</h3>

            <div style={styles.metaContainer}>
              <span style={styles.subTag}>{res.subject}</span>
              <span style={styles.divider}>•</span>
              <span style={styles.sizeText}>{res.size}</span>
            </div>

            <a href={res.downloadUrl} style={styles.downloadLink}>
              <span>Secure Vault Download</span>
              <span>⚡</span>
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
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "24px"
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
  filterBar: {
    display: "flex",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    padding: "6px",
    borderRadius: "14px"
  },
  filterBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#64748b",
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  activeFilter: {
    backgroundColor: "#6366f1",
    color: "#ffffff"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  resourceCard: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, border-color 0.2s"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  iconContainer: {
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 255, 255, 0.04)"
  },
  iconSpair: {
    fontSize: "18px"
  },
  catBadge: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#94a3b8",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: "4px 10px",
    borderRadius: "6px"
  },
  resourceTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
    flexGrow: 1
  },
  metaContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px"
  },
  subTag: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#818cf8"
  },
  divider: {
    color: "#334155",
    fontSize: "12px"
  },
  sizeText: {
    fontSize: "12px",
    color: "#475569",
    fontWeight: "500"
  },
  downloadLink: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(99, 102, 241, 0.06)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#818cf8",
    fontSize: "12px",
    fontWeight: "700",
    textDecoration: "none",
    transition: "background-color 0.2s"
  }
};

export default ResourcesPage;